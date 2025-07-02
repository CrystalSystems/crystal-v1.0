import {
  useState,
  useRef,
  useEffect
} from "react";
import {
  useSelector,
  useDispatch
} from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import TextareaAutosize from "react-textarea-autosize";

import { httpClient } from "../../shared/api";
import { setShowAccessModal } from "../../features/accessModal/accessModalSlice";
import { LoadingBar } from "../../shared/ui";

import styles from "./AddPostPage.module.css";

export function AddPostPage() {

  const darkThemeStatus = useSelector((state) => state.darkThemeStatus);

  // checking user log in
  const logInStatus = useSelector((state) => state.logInStatus)
  // /checking user log in

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const accessModalStatus = useSelector((state) => state.accessModal);

  // post image preview
  const fileImagePreviewRef = useRef();
  const [fileImagePreviewUrl, setFileImagePreviewUrl] = useState();
  const [fileImagePreview, setFileImagePreview] = useState();
  const onClickRemoveFileImagePreview = () => {
    setFileImagePreviewUrl(null);
    setFileImagePreview(null);
    fileImagePreviewRef.current.value = null;
  };

  // compressed post image preview
  // preview image loading and error status
  const [imagePreviewLoadingStatus, setImagePreviewLoadingStatus] =
    useState(false);
  const [imagePreviewLoadingStatusError, setImagePreviewLoadingStatusError] =
    useState(false);
  useEffect(() => {
    if (imagePreviewLoadingStatus === 100) {
      setTimeout(() => {
        setImagePreviewLoadingStatus(false);
      }, "500");
    }
    if (imagePreviewLoadingStatusError) {
      setTimeout(() => {
        setImagePreviewLoadingStatusError(false);
      }, "3500");
    }
  }, [imagePreviewLoadingStatus, imagePreviewLoadingStatusError]);
  // /preview image loading and error status

  async function onChangeCompressedFileImagePreview(event) {
    setImagePreviewLoadingStatusError(false);
    const imageFile = event.target.files[0];
    const options = {
      // maxSizeMB: 1,
      maxSizeMB: 0.25,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      onProgress: (loading) => {
        setImagePreviewLoadingStatus(loading);
      },
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      const convertingBlobToFile = new File([compressedFile], "name.png", {
        type: "image/jpeg",
      });
      setFileImagePreview(convertingBlobToFile);
      setFileImagePreviewUrl(URL.createObjectURL(compressedFile));
      setImagePreviewLoadingStatusError(false);
    } catch (error) {
      console.log(error);
      if (
        error != "Error: The file given is not an instance of Blob or File"
      ) {
        setImagePreviewLoadingStatusError(true);
      }
      setImagePreviewLoadingStatus(false);
    }
  }
  // /compressed post image preview
  // /post image preview

  // title
  const titleRef = useRef();
  const [title, setTitle] = useState("");
  const [titleCharacterCounter, setTitleCharacterCounter] = useState();
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
    setTitleCharacterCounter(event.target.value.length);
  };
  // /title

  // text
  const textRef = useRef();
  const [text, setText] = useState("");
  const [textCharacterCounter, setTextCharacterCounter] = useState();
  const onChangeText = (event) => {
    setText(event.target.value);
    setTextCharacterCounter(event.target.value.length);
  };
  // /text

  const onClickAddPost = async () => {
    try {
      const fields = {
        text,
        title,
        imageUrl: fileImagePreviewUrl,
      };
      fileImagePreview
        ? await httpClient
          .post("/posts/", fields)
          .then((response) => {
            const postId = response._id;
            const formData = new FormData();
            const file = fileImagePreview;
            formData.append("image", file);
            return httpClient.post(
              `/posts/${postId}/image`,
              formData);
          })
          .then((response) => {
            const postId = response.postId;
            const imageUrl = response.url;
            const fields = {
              imageUrl,
              text,
              title,
            };
            return httpClient.patch(`/posts/${postId}`, fields);
          })
          .then((response) => {
            const postId = response.postId;
            navigate(`/posts/${postId}`);
            queryClient.invalidateQueries({ queryKey: ['posts'] });
          })
        : await httpClient.post("/posts/", fields).then((response) => {
          const postId = response._id;
          navigate(`/posts/${postId}`);
          queryClient.invalidateQueries({ queryKey: ['posts'] });
        });
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div
      onClick={() =>
        !logInStatus &&
        dispatch(setShowAccessModal(!accessModalStatus.showAccessModal))
      }
      className={styles.add_post}
      data-add-post-page-dark-theme={darkThemeStatus}
    >
      <div className={styles.title}>
        <h1>{t("AddPostPage.CreatePost")}</h1>
      </div>
      {fileImagePreviewUrl && (
        <div className={styles.image_preview}>
          <img alt="" src={fileImagePreviewUrl} />
        </div>
      )}
      {imagePreviewLoadingStatus && (
        <div className={styles.image_preview_loading_bar_wrap}>
          <div className={styles.image_preview_loading_bar}>
            <LoadingBar value={imagePreviewLoadingStatus} />
          </div>
        </div>
      )}
      {imagePreviewLoadingStatusError && (
        <div className={styles.image_preview_loading_status_error_wrap}>
          <div className={styles.image_preview_loading_status_error}>
            <p>{t("SystemMessages.Error")}</p>
          </div>
        </div>
      )}
      <div className={styles.add_delete_preview_buttons_wrap}>
        <button
          disabled={!logInStatus && true}
          onClick={() => fileImagePreviewRef.current.click()}
        >
          {fileImagePreviewUrl
            ? t("AddPostPage.ChangePreview")
            : t("AddPostPage.AddPreview")}
        </button>
        {fileImagePreviewUrl && (
          <button
            disabled={!logInStatus && true}
            onClick={onClickRemoveFileImagePreview}
          >
            {t("AddPostPage.DeletePreview")}
          </button>
        )}
      </div>
      <div className={styles.post_title}>
        <TextareaAutosize
          type="text"
          maxLength={220}
          value={title}
          ref={titleRef}
          onChange={onChangeTitle}
          variant="standard"
          placeholder={t("AddPostPage.Title")}
        />
      </div>
      {title && (
        <div className={styles.post_title_letter_counter}>
          <p>{titleCharacterCounter}/220</p>
        </div>
      )}
      <div className={styles.text}>
        <TextareaAutosize
          type="text"
          maxLength={75000}
          value={text}
          ref={textRef}
          onChange={onChangeText}
          variant="standard"
          placeholder={
            (fileImagePreview ? "" : "* ") + t("AddPostPage.Text")
          }
        />
        {text && (
          <div className={styles.text_letter_counter}>
            <p>{textCharacterCounter}/75000</p>
          </div>
        )}
      </div>
      <div className={styles.publish_post_back_buttons_wrap}>
        <div className={styles.publish_post_back_buttons}>
          <div className={styles.back}>
            <button onClick={() => navigate(-1)}>
              {t("AddPostPage.Back")}
            </button>
          </div>
          {(fileImagePreview || textCharacterCounter >= 1) && (
            <div className={styles.publish_post}>
              <button onClick={onClickAddPost}>
                {t("AddPostPage.Publish")}
              </button>
            </div>
          )}
        </div>
      </div>
      <input
        ref={fileImagePreviewRef}
        type="file"
        accept="image/*"
        onChange={(event) => onChangeCompressedFileImagePreview(event)}
        hidden
      />
    </div>
  );
}
