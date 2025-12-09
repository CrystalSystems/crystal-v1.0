import { useTranslation } from "react-i18next";
import styles from "./PrivacyPage.module.css";

export function PrivacyPage() {
  const { i18n } = useTranslation();
  return (
    <div className={styles.privacy}>
      {i18n.language === "ru" ? (
        <>
          <h1>Политика конфиденциальности социальной сети CRYSTAL</h1>
          <h2>1. Общие положения</h2>
          <p>
            Настоящая политика обработки персональных данных составлена в
            соответствии с требованиями Федерального закона от 27.07.2006. №
            152-ФЗ «О персональных данных» (далее — Закон о персональных
            данных) и определяет порядок обработки персональных данных и
            меры по обеспечению безопасности персональных данных,
            предпринимаемые CRYSTAL (далее — Оператор).
          </p>
          <p>
            1.1. Оператор ставит своей важнейшей целью и условием
            осуществления своей деятельности соблюдение прав и свобод
            человека и гражданина при обработке его персональных данных, в
            том числе защиты прав на неприкосновенность частной жизни,
            личную и семейную тайну.
          </p>
          <p>
            1.2. Настоящая политика Оператора в отношении обработки
            персональных данных (далее — Политика) применяется ко всей
            информации, которую Оператор может получить о посетителях
            веб-сайта www.crystal.you.
          </p>
          <h2>2. Основные понятия, используемые в Политике</h2>
          <p>
            2.1. Автоматизированная обработка персональных данных —
            обработка персональных данных с помощью средств вычислительной
            техники.
          </p>
          <p>
            2.2. Блокирование персональных данных — временное прекращение
            обработки персональных данных (за исключением случаев, если
            обработка необходима для уточнения персональных данных).
          </p>
          <p>
            2.3. Веб-сайт — совокупность графических и информационных
            материалов, а также программ для ЭВМ и баз данных,
            обеспечивающих их доступность в сети интернет по сетевому адресу
            www.crystal.you.
          </p>
          <p>
            2.4. Информационная система персональных данных — совокупность
            содержащихся в базах данных персональных данных и обеспечивающих
            их обработку информационных технологий и технических средств.
          </p>
          <p>
            2.5. Обезличивание персональных данных — действия, в результате
            которых невозможно определить без использования дополнительной
            информации принадлежность персональных данных конкретному
            Пользователю или иному субъекту персональных данных.
          </p>
          <p>
            2.6. Обработка персональных данных — любое действие (операция)
            или совокупность действий (операций), совершаемых с
            использованием средств автоматизации или без использования таких
            средств с персональными данными, включая сбор, запись,
            систематизацию, накопление, хранение, уточнение (обновление,
            изменение), извлечение, использование, передачу
            (распространение, предоставление, доступ), обезличивание,
            блокирование, удаление, уничтожение персональных данных.
          </p>
          <p>
            2.7. Оператор — государственный орган, муниципальный орган,
            юридическое или физическое лицо, самостоятельно или совместно с
            другими лицами организующие и/или осуществляющие обработку
            персональных данных, а также определяющие цели обработки
            персональных данных, состав персональных данных, подлежащих
            обработке, действия (операции), совершаемые с персональными
            данными.
          </p>
          <p>
            2.8. Персональные данные — любая информация, относящаяся прямо
            или косвенно к определенному или определяемому Пользователю
            веб-сайта www.crystal.you.
          </p>
          <p>
            2.9. Персональные данные, разрешенные субъектом персональных
            данных для распространения, — персональные данные, доступ
            неограниченного круга лиц к которым предоставлен субъектом
            персональных данных путем дачи согласия на обработку
            персональных данных, разрешенных субъектом персональных данных
            для распространения в порядке, предусмотренном Законом о
            персональных данных (далее — персональные данные, разрешенные
            для распространения).
          </p>
          <p>
            2.10. Пользователь — любой посетитель веб-сайта www.crystal.you.
          </p>
          <p>
            2.11. Предоставление персональных данных — действия,
            направленные на раскрытие персональных данных определенному лицу
            или определенному кругу лиц.
          </p>
          <p>
            2.12. Распространение персональных данных — любые действия,
            направленные на раскрытие персональных данных неопределенному
            кругу лиц (передача персональных данных) или на ознакомление с
            персональными данными неограниченного круга лиц, в том числе
            обнародование персональных данных в средствах массовой
            информации, размещение в информационно-телекоммуникационных
            сетях или предоставление доступа к персональным данным
            каким-либо иным способом.
          </p>
          <p>
            2.13. Трансграничная передача персональных данных — передача
            персональных данных на территорию иностранного государства
            органу власти иностранного государства, иностранному физическому
            или иностранному юридическому лицу.
          </p>
          <p>
            2.14. Уничтожение персональных данных — любые действия, в
            результате которых персональные данные уничтожаются безвозвратно
            с невозможностью дальнейшего восстановления содержания
            персональных данных в информационной системе персональных данных
            и/или уничтожаются материальные носители персональных данных.
          </p>
          <h2>3. Основные права и обязанности Оператора</h2>
          <p>3.1. Оператор имеет право:</p>
          <p>
            — получать от субъекта персональных данных достоверные
            информацию и/или документы, содержащие персональные данные;
          </p>
          <p>
            — в случае отзыва субъектом персональных данных согласия на
            обработку персональных данных, а также, направления обращения с
            требованием о прекращении обработки персональных данных,
            Оператор вправе продолжить обработку персональных данных без
            согласия субъекта персональных данных при наличии оснований,
            указанных в Законе о персональных данных;
          </p>
          <p>
            — самостоятельно определять состав и перечень мер, необходимых и
            достаточных для обеспечения выполнения обязанностей,
            предусмотренных Законом о персональных данных и принятыми в
            соответствии с ним нормативными правовыми актами, если иное не
            предусмотрено Законом о персональных данных или другими
            федеральными законами.
          </p>
          <p>
            — самостоятельно определять состав и перечень мер, необходимых и
            достаточных для обеспечения выполнения обязанностей,
            предусмотренных Законом о персональных данных и принятыми в
            соответствии с ним нормативными правовыми актами, если иное не
            предусмотрено Законом о персональных данных или другими
            федеральными законами.
          </p>
          <p>3.2. Оператор обязан:</p>
          <p>
            — предоставлять субъекту персональных данных по его просьбе
            информацию, касающуюся обработки его персональных данных;
          </p>
          <p>
            — организовывать обработку персональных данных в порядке,
            установленном действующим законодательством РФ;
          </p>
          <p>
            — отвечать на обращения и запросы субъектов персональных данных
            и их законных представителей в соответствии с требованиями
            Закона о персональных данных;
          </p>
          <p>
            — сообщать в уполномоченный орган по защите прав субъектов
            персональных данных по запросу этого органа необходимую
            информацию в течение 10 дней с даты получения такого запроса;
          </p>
          <p>
            — публиковать или иным образом обеспечивать неограниченный
            доступ к настоящей Политике в отношении обработки персональных
            данных;
          </p>
          <p>
            — принимать правовые, организационные и технические меры для
            защиты персональных данных от неправомерного или случайного
            доступа к ним, уничтожения, изменения, блокирования,
            копирования, предоставления, распространения персональных
            данных, а также от иных неправомерных действий в отношении
            персональных данных;
          </p>
          <p>
            — прекратить передачу (распространение, предоставление, доступ)
            персональных данных, прекратить обработку и уничтожить
            персональные данные в порядке и случаях, предусмотренных Законом
            о персональных данных;
          </p>
          <p>
            — исполнять иные обязанности, предусмотренные Законом о
            персональных данных.
          </p>
          <h2>
            4. Основные права и обязанности субъектов персональных данных
          </h2>
          <p>4.1. Субъекты персональных данных имеют право:</p>
          <p>
            — получать информацию, касающуюся обработки его персональных
            данных, за исключением случаев, предусмотренных федеральными
            законами. Сведения предоставляются субъекту персональных данных
            Оператором в доступной форме, и в них не должны содержаться
            персональные данные, относящиеся к другим субъектам персональных
            данных, за исключением случаев, когда имеются законные основания
            для раскрытия таких персональных данных. Перечень информации и
            порядок ее получения установлен Законом о персональных данных;
          </p>
          <p>
            — требовать от оператора уточнения его персональных данных, их
            блокирования или уничтожения в случае, если персональные данные
            являются неполными, устаревшими, неточными, незаконно
            полученными или не являются необходимыми для заявленной цели
            обработки, а также принимать предусмотренные законом меры по
            защите своих прав;
          </p>
          <p>
            — выдвигать условие предварительного согласия при обработке
            персональных данных в целях продвижения на рынке товаров, работ
            и услуг;
          </p>
          <p>
            — на отзыв согласия на обработку персональных данных, а также,
            на направление требования о прекращении обработки персональных
            данных;
          </p>
          <p>
            — обжаловать в уполномоченный орган по защите прав субъектов
            персональных данных или в судебном порядке неправомерные
            действия или бездействие Оператора при обработке его
            персональных данных;
          </p>
          <p>
            — на осуществление иных прав, предусмотренных законодательством
            РФ.
          </p>
          <p>4.2. Субъекты персональных данных обязаны:</p>
          <p>— предоставлять Оператору достоверные данные о себе;</p>
          <p>
            — сообщать Оператору об уточнении (обновлении, изменении) своих
            персональных данных.
          </p>
          <p>
            4.3. Лица, передавшие Оператору недостоверные сведения о себе,
            либо сведения о другом субъекте персональных данных без согласия
            последнего, несут ответственность в соответствии с
            законодательством РФ.
          </p>
          <h2>5. Принципы обработки персональных данных</h2>
          <p>
            5.1. Обработка персональных данных осуществляется на законной и
            справедливой основе.
          </p>
          <p>
            5.2. Обработка персональных данных ограничивается достижением
            конкретных, заранее определенных и законных целей. Не
            допускается обработка персональных данных, несовместимая с
            целями сбора персональных данных.
          </p>
          <p>
            5.3. Не допускается объединение баз данных, содержащих
            персональные данные, обработка которых осуществляется в целях,
            несовместимых между собой.
          </p>
          <p>
            5.4. Обработке подлежат только персональные данные, которые
            отвечают целям их обработки.
          </p>
          <p>
            5.5. Содержание и объем обрабатываемых персональных данных
            соответствуют заявленным целям обработки. Не допускается
            избыточность обрабатываемых персональных данных по отношению к
            заявленным целям их обработки.
          </p>
          <p>
            5.6. При обработке персональных данных обеспечивается точность
            персональных данных, их достаточность, а в необходимых случаях и
            актуальность по отношению к целям обработки персональных данных.
            Оператор принимает необходимые меры и/или обеспечивает их
            принятие по удалению или уточнению неполных или неточных данных.
          </p>
          <p>
            5.7. Хранение персональных данных осуществляется в форме,
            позволяющей определить субъекта персональных данных, не дольше,
            чем этого требуют цели обработки персональных данных, если срок
            хранения персональных данных не установлен федеральным законом,
            договором, стороной которого, выгодоприобретателем или
            поручителем по которому является субъект персональных данных.
            Обрабатываемые персональные данные уничтожаются либо
            обезличиваются по достижении целей обработки или в случае утраты
            необходимости в достижении этих целей, если иное не
            предусмотрено федеральным законом.
          </p>
          <h2>6. Цели обработки персональных данных</h2>
          <p>
            Цель обработки предоставление доступа Пользователю к сервисам,
            информации и/или материалам, содержащимся на веб-сайте
            Персональные данные электронный адрес номера телефонов фамилия и
            имя Правовые основания Федеральный закон «Об информации,
            информационных технологиях и о защите информации» от 27.07.2006
            N 149-ФЗ Виды обработки персональных данных Сбор, запись,
            систематизация, накопление, хранение, уничтожение и
            обезличивание персональных данных Отправка информационных писем
            на адрес электронной почты
          </p>
          <h2>7. Условия обработки персональных данных</h2>
          <p>
            7.1. Обработка персональных данных осуществляется с согласия
            субъекта персональных данных на обработку его персональных
            данных.
          </p>
          <p>
            7.2. Обработка персональных данных необходима для достижения
            целей, предусмотренных международным договором Российской
            Федерации или законом, для осуществления возложенных
            законодательством Российской Федерации на оператора функций,
            полномочий и обязанностей.
          </p>
          <p>
            7.3. Обработка персональных данных необходима для осуществления
            правосудия, исполнения судебного акта, акта другого органа или
            должностного лица, подлежащих исполнению в соответствии с
            законодательством Российской Федерации об исполнительном
            производстве.
          </p>
          <p>
            7.4. Обработка персональных данных необходима для исполнения
            договора, стороной которого либо выгодоприобретателем или
            поручителем по которому является субъект персональных данных, а
            также для заключения договора по инициативе субъекта
            персональных данных или договора, по которому субъект
            персональных данных будет являться выгодоприобретателем или
            поручителем.
          </p>
          <p>
            7.5. Обработка персональных данных необходима для осуществления
            прав и законных интересов оператора или третьих лиц либо для
            достижения общественно значимых целей при условии, что при этом
            не нарушаются права и свободы субъекта персональных данных.
          </p>
          <p>
            7.6. Осуществляется обработка персональных данных, доступ
            неограниченного круга лиц к которым предоставлен субъектом
            персональных данных либо по его просьбе (далее — общедоступные
            персональные данные).
          </p>
          <p>
            7.7. Осуществляется обработка персональных данных, подлежащих
            опубликованию или обязательному раскрытию в соответствии с
            федеральным законом.
          </p>
          <h2>
            8. Порядок сбора, хранения, передачи и других видов обработки
            персональных данных.</h2>
          <p>Безопасность персональных данных, которые
            обрабатываются Оператором, обеспечивается путем реализации
            правовых, организационных и технических мер, необходимых для
            выполнения в полном объеме требований действующего
            законодательства в области защиты персональных данных.
          </p>
          <p>
            8.1. Оператор обеспечивает сохранность персональных данных и
            принимает все возможные меры, исключающие доступ к персональным
            данным неуполномоченных лиц.
          </p>
          <p>
            8.2. Персональные данные Пользователя никогда, ни при каких
            условиях не будут переданы третьим лицам, за исключением
            случаев, связанных с исполнением действующего законодательства
            либо в случае, если субъектом персональных данных дано согласие
            Оператору на передачу данных третьему лицу для исполнения
            обязательств по гражданско-правовому договору.
          </p>
          <p>
            8.3. В случае выявления неточностей в персональных данных,
            Пользователь может актуализировать их самостоятельно, путем
            направления Оператору уведомление на адрес электронной почты
            Оператора crystalhelpservice@gmail.com с пометкой «Актуализация
            персональных данных».
          </p>
          <p>
            8.4. Срок обработки персональных данных определяется достижением
            целей, для которых были собраны персональные данные, если иной
            срок не предусмотрен договором или действующим
            законодательством. Пользователь может в любой момент отозвать
            свое согласие на обработку персональных данных, направив
            Оператору уведомление посредством электронной почты на
            электронный адрес Оператора crystalhelpservice@gmail.com с
            пометкой «Отзыв согласия на обработку персональных данных».
          </p>
          <p>
            8.5. Вся информация, которая собирается сторонними сервисами, в
            том числе платежными системами, средствами связи и другими
            поставщиками услуг, хранится и обрабатывается указанными лицами
            (Операторами) в соответствии с их Пользовательским соглашением и
            Политикой конфиденциальности. Субъект персональных данных и/или
            с указанными документами. Оператор не несет ответственность за
            действия третьих лиц, в том числе указанных в настоящем пункте
            поставщиков услуг.
          </p>
          <p>
            8.6. Установленные субъектом персональных данных запреты на
            передачу (кроме предоставления доступа), а также на обработку
            или условия обработки (кроме получения доступа) персональных
            данных, разрешенных для распространения, не действуют в случаях
            обработки персональных данных в государственных, общественных и
            иных публичных интересах, определенных законодательством РФ.
          </p>
          <p>
            8.7. Оператор при обработке персональных данных обеспечивает
            конфиденциальность персональных данных.
          </p>
          <p>
            8.8. Оператор осуществляет хранение персональных данных в форме,
            позволяющей определить субъекта персональных данных, не дольше,
            чем этого требуют цели обработки персональных данных, если срок
            хранения персональных данных не установлен федеральным законом,
            договором, стороной которого, выгодоприобретателем или
            поручителем по которому является субъект персональных данных.
          </p>
          <p>
            8.9. Условием прекращения обработки персональных данных может
            являться достижение целей обработки персональных данных,
            истечение срока действия согласия субъекта персональных данных,
            отзыв согласия субъектом персональных данных или требование о
            прекращении обработки персональных данных, а также выявление
            неправомерной обработки персональных данных.
          </p>
          <h2>
            9. Перечень действий, производимых Оператором с полученными
            персональными данными
          </h2>
          <p>
            9.1. Оператор осуществляет сбор, запись, систематизацию,
            накопление, хранение, уточнение (обновление, изменение),
            извлечение, использование, передачу (распространение,
            предоставление, доступ), обезличивание, блокирование, удаление и
            уничтожение персональных данных.
          </p>
          <p>
            9.2. Оператор осуществляет автоматизированную обработку
            персональных данных с получением и/или передачей полученной
            информации по информационно-телекоммуникационным сетям или без
            таковой.
          </p>
          <h2>10. Трансграничная передача персональных данных</h2>
          <p>
            10.1. Оператор до начала осуществления деятельности по
            трансграничной передаче персональных данных обязан уведомить
            уполномоченный орган по защите прав субъектов персональных
            данных о своем намерении осуществлять трансграничную передачу
            персональных данных (такое уведомление направляется отдельно от
            уведомления о намерении осуществлять обработку персональных
            данных).
          </p>
          <p>
            10.2. Оператор до подачи вышеуказанного уведомления, обязан
            получить от органов власти иностранного государства, иностранных
            физических лиц, иностранных юридических лиц, которым планируется
            трансграничная передача персональных данных, соответствующие
            сведения.
          </p>
          <h2>
            11. Конфиденциальность персональных данных.</h2>
          <p>Оператор и иные лица,
            получившие доступ к персональным данным, обязаны не раскрывать
            третьим лицам и не распространять персональные данные без
            согласия субъекта персональных данных, если иное не
            предусмотрено федеральным законом.</p>
          <h2>12. Заключительные положения</h2>
          <p>
            12.1. Пользователь может получить любые разъяснения по
            интересующим вопросам, касающимся обработки его персональных
            данных, обратившись к Оператору с помощью электронной почты
            crystalhelpservice@gmail.com.
          </p>
          <p>
            12.2. В данном документе будут отражены любые изменения политики
            обработки персональных данных Оператором. Политика действует
            бессрочно до замены ее новой версией.
          </p>
          <p>
            12.3. Актуальная версия Политики в свободном доступе расположена
            в сети Интернет по адресу www.crystal.you/privacy.
          </p>
        </>
      ) : (
        <>
          <h1>Privacy Policy of the CRYSTAL social network</h1>
          <h2>1. General provisions</h2>
          <p>
            This personal data processing policy has been drawn up in
            accordance with the requirements of the Federal Law of July 27,
            2006. No. 152-FZ “On Personal Data” (hereinafter referred to as
            the Law on Personal Data) and determines the procedure for
            processing personal data and measures to ensure the security of
            personal data taken by CRYSTAL (hereinafter referred to as the
            Operator).
          </p>
          <p>
            1.1. The operator sets as its most important goal and condition
            for carrying out its activities the observance of the rights and
            freedoms of man and citizen when processing his personal data,
            including the protection of the rights to privacy, personal and
            family secrets.
          </p>
          <p>
            1.2. This Operator&#39;s policy regarding the processing of personal
            data (hereinafter referred to as the Policy) applies to all
            information that the Operator can obtain about visitors to the
            website www.crystal.you.
          </p>
          <h2>2. Basic concepts used in the Policy</h2>
          <p>
            2.1. Automated processing of personal data - processing of
            personal data using computer technology.
          </p>
          <p>
            2.2. Blocking of personal data - temporary cessation of
            processing of personal data (except for cases where processing
            is necessary to clarify personal data).
          </p>
          <p>
            2.3. Website is a collection of graphic and information
            materials, as well as computer programs and databases that
            ensure their availability on the Internet at the network address
            www.crystal.you.
          </p>
          <p>
            2.4. Personal data information system is a set of personal data
            contained in databases and information technologies and
            technical means that ensure their processing.
          </p>
          <p>
            2.5. Depersonalization of personal data - actions as a result of
            which it is impossible to determine without the use of
            additional information the ownership of personal data to a
            specific User or other subject of personal data.
          </p>
          <p>
            2.6. Processing of personal data - any action (operation) or set
            of actions (operations) performed using automation tools or
            without the use of such tools with personal data, including
            collection, recording, systematization, accumulation, storage,
            clarification (updating, changing), extraction, use, transfer
            (distribution, provision, access), depersonalization, blocking,
            deletion, destruction of personal data.
          </p>
          <p>
            2.7. Operator - a state body, municipal body, legal or natural
            person, independently or jointly with other persons organizing
            and/or carrying out the processing of personal data, as well as
            determining the purposes of processing personal data, the
            composition of personal data to be processed, actions
            (operations) performed with personal data.
          </p>
          <p>
            2.8. Personal data - any information relating directly or
            indirectly to a specific or identified User of the website
            www.crystal.you.
          </p>
          <p>
            2.9. Personal data authorized by the subject of personal data
            for distribution - personal data, access to an unlimited number
            of persons to which is provided by the subject of personal data
            by giving consent to the processing of personal data authorized
            by the subject of personal data for distribution in the manner
            prescribed by the Law on Personal Data (hereinafter referred to
            as personal data). data permitted for distribution).
          </p>
          <p>2.10. User - any visitor to the website www.crystal.you.</p>
          <p>
            2.11. Providing personal data - actions aimed at disclosing
            personal data to a certain person or a certain circle of
            persons.
          </p>
          <p>
            2.12. Distribution of personal data - any actions aimed at
            disclosing personal data to an indefinite number of persons
            (transfer of personal data) or to familiarize with personal data
            to an unlimited number of persons, including the publication of
            personal data in the media, posting in information and
            telecommunication networks or providing access to personal data
            in any other way.
          </p>
          <p>
            2.13. Cross-border transfer of personal data - transfer of
            personal data to the territory of a foreign state to an
            authority of a foreign state, a foreign individual or a foreign
            legal entity.
          </p>
          <p>
            2.14. Destruction of personal data - any actions as a result of
            which personal data is destroyed irrevocably with the
            impossibility of further restoration of the content of personal
            data in the personal data information system and/or the material
            media of personal data are destroyed.
          </p>
          <h2>3. Basic rights and obligations of the Operator</h2>
          <p>3.1. The operator has the right:</p>
          <p>
            —receive reliable information and/or documents containing
            personal data from the subject of personal data;
          </p>
          <p>
            — in case the subject of personal data withdraws consent to
            personal data processingdata, as well as sending an appeal to
            stop processing personal data, the Operator has the right to
            continue processing personal data without the consent of the
            subject of personal data if there are grounds specified in the
            Law on Personal Data;
          </p>
          <p>
            — independently determine the composition and list of measures
            necessary and sufficient to ensure the fulfillment of the
            obligations provided for by the Law on Personal Data and
            regulations adopted in accordance with it, unless otherwise
            provided by the Law on Personal Data or other federal laws.
          </p>
          <p>
            — independently determine the composition and list of measures
            necessary and sufficient to ensure the fulfillment of the
            obligations provided for by the Law on Personal Data and
            regulations adopted in accordance with it, unless otherwise
            provided by the Law on Personal Data or other federal laws.
          </p>
          <p>3.2. The operator is obliged:</p>
          <p>
            — provide the subject of personal data, at his request, with
            information regarding the processing of his personal data;
          </p>
          <p>
            — organize the processing of personal data in the manner
            established by the current legislation of the Russian
            Federation;
          </p>
          <p>
            — respond to requests and requests from personal data subjects
            and their legal representatives in accordance with the
            requirements of the Law on Personal Data;
          </p>
          <p>
            — report to the authorized body for the protection of the rights
            of personal data subjects, at the request of this body, the
            necessary information within 10 days from the date of receipt of
            such a request;
          </p>
          <p>
            — publish or otherwise provide unrestricted access to this
            Policy regarding the processing of personal data;
          </p>
          <p>
            — take legal, organizational and technical measures to protect
            personal data from unauthorized or accidental access,
            destruction, modification, blocking, copying, provision,
            distribution of personal data, as well as from other unlawful
            actions in relation to personal data;
          </p>
          <p>
            — stop the transfer (distribution, provision, access) of
            personal data, stop processing and destroy personal data in the
            manner and cases provided for by the Law on Personal Data;
          </p>
          <p>
            — fulfill other duties provided for by the Personal Data Law.
          </p>
          <h2>4. Basic rights and obligations of personal data subjects</h2>
          <p>4.1. Subjects of personal data have the right:</p>
          <p>
            —receive information regarding the processing of his personal
            data, except in cases provided for by federal laws. The
            information is provided to the subject of personal data by the
            Operator in an accessible form, and it should not contain
            personal data relating to other subjects of personal data,
            except in cases where there are legal grounds for the disclosure
            of such personal data. The list of information and the procedure
            for obtaining it is established by the Law on Personal Data;
          </p>
          <p>
            — require the operator to clarify his personal data, block it or
            destroy it if the personal data is incomplete, outdated,
            inaccurate, illegally obtained or is not necessary for the
            stated purpose of processing, as well as take measures provided
            by law to protect their rights ;
          </p>
          <p>
            —put forward the condition of prior consent when processing
            personal data in order to promote goods, works and services on
            the market;
          </p>
          <p>
            —to withdraw consent to the processing of personal data, as well
            as to send a request to stop processing personal data;
          </p>
          <p>
            — appeal to the authorized body for the protection of the rights
            of personal data subjects or in court against unlawful actions
            or inaction of the Operator when processing his personal data;
          </p>
          <p>
            — to exercise other rights provided for by the legislation of
            the Russian Federation.
          </p>
          <p>4.2. Subjects of personal data are obliged to:</p>
          <p>
            — provide the Operator with reliable information about yourself;
          </p>
          <p>
            — inform the Operator about clarification (updating, changing)
            of your personal data.
          </p>
          <p>
            4.3. Persons who provided the Operator with false information
            about themselves or information about another subject of
            personal data without the latter’s consent are liable in
            accordance with the legislation of the Russian Federation.
          </p>
          <h2>5. Principles for processing personal data</h2>
          <p>
            5.1. The processing of personal data is carried out on a legal
            and fair basis.
          </p>
          <p>
            5.2. The processing of personal data is limited to the
            achievement of specific, pre-defined and legitimate purposes.
            Processing of personal data incompatible with the purposes of
            collecting personal data is not permitted.
          </p>
          <p>
            5.3. It is not allowed to combine databases containing personal
            data, the processing of which is carried out for purposes that
            are incompatible with each other.
          </p>
          <p>
            5.4. Only personal data that meets the purposes of their
            processing are subject to processing.
          </p>
          <p>
            5.5. The content and volume of personal data processed
            correspond to the stated purposes of processing. Redundancy of
            processed personal data is not allowed.data in relation to the
            stated purposes of their processing.
          </p>
          <p>
            5.6. When processing personal data, the accuracy of personal
            data, their sufficiency, and, where necessary, relevance in
            relation to the purposes of processing personal data are
            ensured. The operator takes the necessary measures and/or
            ensures that they are taken to delete or clarify incomplete or
            inaccurate data.
          </p>
          <p>
            5.7. The storage of personal data is carried out in a form that
            makes it possible to identify the subject of personal data, no
            longer than required by the purposes of processing personal
            data, unless the period for storing personal data is established
            by federal law, an agreement to which the subject of personal
            data is a party, beneficiary or guarantor. The processed
            personal data is destroyed or anonymized upon achievement of the
            processing goals or in the event of the loss of the need to
            achieve these goals, unless otherwise provided by federal law.
          </p>
          <h2>6. Purposes of processing personal data</h2>
          <p>
            The purpose of processing is to provide the User with access to
            services, information and/or materials contained on the website
            Personal Information email address phone numbers last name and
            first name Legal grounds Federal Law “On Information,
            Information Technologies and Information Protection” dated July
            27, 2006 N 149-FZ Types of personal data processing Collection,
            recording, systematization, accumulation, storage, destruction
            and depersonalization of personal data Sending information
            letters to an email address
          </p>
          <h2>7. Conditions for processing personal data</h2>
          <p>
            7.1. The processing of personal data is carried out with the
            consent of the subject of personal data to the processing of his
            personal data.
          </p>
          <p>
            7.2. The processing of personal data is necessary to achieve the
            goals provided for by an international treaty of the Russian
            Federation or law, to implement the functions, powers and
            responsibilities assigned by the legislation of the Russian
            Federation to the operator.
          </p>
          <p>
            7.3. The processing of personal data is necessary for the
            administration of justice, the execution of a judicial act, an
            act of another body or official, subject to execution in
            accordance with the legislation of the Russian Federation on
            enforcement proceedings.
          </p>
          <p>
            7.4. The processing of personal data is necessary for the
            execution of an agreement to which the subject of personal data
            is a party or beneficiary or guarantor, as well as for
            concluding an agreement at the initiative of the subject of
            personal data or an agreement under which the subject of
            personal data will be a beneficiary or guarantor.
          </p>
          <p>
            7.5. The processing of personal data is necessary to exercise
            the rights and legitimate interests of the operator or third
            parties or to achieve socially significant goals, provided that
            the rights and freedoms of the subject of personal data are not
            violated.
          </p>
          <p>
            7.6. The processing of personal data is carried out, access to
            an unlimited number of persons is provided by the subject of
            personal data or at his request (hereinafter referred to as
            publicly available personal data).
          </p>
          <p>
            7.7. We process personal data that is subject to publication or
            mandatory disclosure in accordance with federal law.
          </p>
          <h2>
            8. The procedure for collecting, storing, transferring and other
            types of processing of personal data The security of personal
            data processed by the Operator is ensured by implementing legal,
            organizational and technical measures necessary to fully comply
            with the requirements of current legislation in the field of
            personal data protection.
          </h2>
          <p>
            8.1. The operator ensures the safety of personal data and takes
            all possible measures to prevent access to personal data by
            unauthorized persons.
          </p>
          <p>
            8.2. The User&#39;s personal data will never, under any
            circumstances, be transferred to third parties, except in cases
            related to the implementation of current legislation or in the
            event that the subject of the personal data has given consent to
            the Operator to transfer data to a third party to fulfill
            obligations under a civil law contract.
          </p>
          <p>
            8.3. If inaccuracies in personal data are identified, the User
            can update them independently by sending a notification to the
            Operator to the Operator&#39;s email address
            crystalhelpservice@gmail.com with the mark “Updating personal
            data.”
          </p>
          <p>
            8.4. The period for processing personal data is determined by
            the achievement of the purposes for which the personal data were
            collected, unless a different period is provided for by the
            contract or current legislation. The User may at any time
            withdraw his consent to the processing of personal data by
            sending a notification to the Operator via email to the
            Operator&#39;s email address crystalhelpservice@gmail.com with the
            note “Withdrawal of consent to the processing of personal data.”
          </p>
          <p>
            8.5. All information that is collected by third-party services,
            including payment systems, communications and other service
            providers, is stored andprocessed by specified persons
            (Operators) in accordance with their User Agreement and Privacy
            Policy. Subject of personal data and/or with specified
            documents. The operator is not responsible for the actions of
            third parties, including the service providers specified in this
            paragraph.
          </p>
          <p>
            8.6. Prohibitions established by the subject of personal data on
            the transfer (except for providing access), as well as on
            processing or conditions for processing (except for gaining
            access) of personal data permitted for distribution, do not
            apply in cases of processing personal data in state, public and
            other public interests determined by law RF.
          </p>
          <p>
            8.7. When processing personal data, the operator ensures the
            confidentiality of personal data.
          </p>
          <p>
            8.8. The operator stores personal data in a form that makes it
            possible to identify the subject of personal data for no longer
            than required by the purposes of processing personal data,
            unless the period for storing personal data is established by
            federal law, an agreement to which the subject of personal data
            is a party, beneficiary or guarantor.{" "}
          </p>
          <p>
            8.9. The condition for terminating the processing of personal
            data may be the achievement of the purposes of processing
            personal data, the expiration of the consent of the subject of
            personal data, withdrawal of consent by the subject of personal
            data or a requirement to stop processing personal data, as well
            as identification of unlawful processing of personal data.
          </p>
          <h2>
            9. List of actions performed by the Operator with received
            personal data
          </h2>
          <p>
            9.1. The operator collects, records, systematizes, accumulates,
            stores, refines (updates, changes), extracts, uses, transfers
            (distribution, provision, access), depersonalizes, blocks,
            deletes and destroys personal data.
          </p>
          <p>
            9.2. The operator carries out automated processing of personal
            data with or without receiving and/or transmitting the received
            information via information and telecommunication networks.
          </p>
          <h2>10. Cross-border transfer of personal data</h2>
          <p>
            10.1. Before starting activities for the cross-border transfer
            of personal data, the operator is obliged to notify the
            authorized body for the protection of the rights of personal
            data subjects of its intention to carry out cross-border
            transfer of personal data (such notification is sent separately
            from the notification of the intention to process personal
            data).
          </p>
          <p>
            10.2. Before submitting the above notification, the operator is
            obliged to obtain relevant information from the authorities of a
            foreign state, foreign individuals, foreign legal entities to
            whom cross-border transfer of personal data is planned.
          </p>
          <h2>
            11. Confidentiality of personal data.</h2>
          <p>The operator and other
            persons who have access to personal data are obliged not to
            disclose to third parties or distribute personal data without
            the consent of the subject of personal data, unless otherwise
            provided by federal law.</p>
          <h2>12. Final provisions</h2>
          <p>
            12.1. The User can receive any clarification on issues of
            interest regarding the processing of his personal data by
            contacting the Operator via email crystalhelpservice@gmail.com.
          </p>
          <p>
            12.2. This document will reflect any changes to the Operator’s
            personal data processing policy. The policy is valid
            indefinitely until it is replaced by a new version.
          </p>
          <p>
            12.3. The current version of the Policy is freely available on
            the Internet at www.crystal.you/privacy.
          </p>
        </>
      )}
    </div>
  );
};
