import { useTranslation } from "react-i18next";
import styles from "./TermsPage.module.css";

export function TermsPage() {
  const { i18n } = useTranslation();
  return (
    <div className={styles.terms}>
      {i18n.language === "ru" ? (
        <>
          <h1>Пользовательское соглашение социальной сети CRYSTAL</h1>
          <p>
            1.1. Данное пользовательское соглашение (именуемое в дальнейшем
            Соглашение) представляет собой оферту условий по пользованию
            веб-сайтом - www.crysty.ru (далее – Сайт), в лице Администрации
            сайта и физическим лицом (в том числе представителями
            юридических лиц) (именуемым в дальнейшем Пользователь), и
            регламентирующее условия предоставления Пользователем информации
            для размещения на Сайте.
          </p>
          <p>
            1.2. Пользователем Сайта считается любое физическое лицо,
            когда-либо осуществившее доступ к Сайту, достигшее возраста,
            допустимого для акцепта настоящего Соглашения.
          </p>
          <p>
            1.3. Пользователь обязан полностью ознакомиться с настоящим
            Соглашением до момента регистрации на Сайте. Регистрация
            Пользователя на Сайте означает полное и безоговорочное принятие
            Пользователем настоящего Соглашения. В случае несогласия с
            условиями Соглашения, использование Сайта Пользователем должно
            быть немедленно прекращено.
          </p>
          <p>
            1.4. Настоящее Соглашение находится по адресу -
            www.crysty.ru/terms, и может быть изменено и/или дополнено
            Администрацией Сайта в одностороннем порядке, без какого-либо
            специального уведомления. Настоящее Соглашение является открытым
            и общедоступным документом.
          </p>
          <p>
            1.5. Соглашение предусматривает взаимные права и обязанности
            Пользователя и Администрации Сайта.
          </p>
          <h2>2. Порядок использования Сайта</h2>
          <p>
            2.1. При регистрации на сайте, Пользователь соглашается
            предоставить достоверную и точную информацию о себе и своих
            контактных данных.
          </p>
          <p>
            2.2. В процессе регистрации на сайте, Пользователь получает
            логин и пароль, за безопасность, которых несет персональную
            ответственность.
          </p>
          <p>
            {" "}
            2.3. Пользователь может обращаться к Администрации сайта с
            вопросами, претензиями, пожеланиями по улучшению работы, либо с
            какой-либо иной информацией, по адресу электроной почты -
            CrystalHelpService@gmail.com. При этом Пользователь несет
            ответственность, что данное обращение не является незаконным,
            угрожающим, нарушает авторские права, дискриминацию людей по
            какому-либо признаку, а также содержит оскорбления либо иным
            образом нарушает действующее законодательство РФ.
          </p>
          <p>
            2.4. Администрация сайта оставляет за собой право удалить аккаунт
            пользователя и его личные данные, а также любые материалы, которые были опубликованы пользователем на сайте, либо заблокировать аккаунт на
            любое время, а также удалить, либо ограничить доступ к постам и
            различным материалам пользователя, без объяснения причин.
          </p>
          <h2>3. Персональная информация Пользователя</h2>
          <p>
            {" "}
            3.1. Администрация сайта с уважением и ответственностью
            относится к конфиденциальной информации любого лица, ставшего
            посетителем этого сайта. Принимая это Соглашение Пользователь
            дает согласие на сбор, обработку и использование определенной
            информации о Пользователе в соответствии с положениями ФЗ-152 &#34;О
            защите персональных данных&#34;. Кроме того, пользователь дает
            согласие, что Администрация сайта может собирать, использовать,
            передавать, обрабатывать и поддерживать информацию, связанную с
            аккаунтом Пользователя с целью предоставления соответственных
            услуг.
          </p>
          <p>
            3.2. Администрация сайта обязуется осуществлять сбор только той
            персональной информации, которую Потребитель предоставляет
            добровольно в случае, когда информация нужна для предоставления
            (улучшения) услуг Потребителю.
          </p>
          <p>
            3.3. Администрация сайта собирает как основные персональные
            данные, такие как имя, фамилия, электронный адрес, так и
            вторичные (технические) данные - файлы cookies, информация о
            соединениях и системная информация.
          </p>
          <p>
            3.4. Пользователь соглашается с тем, что конфиденциальность
            переданных через Интернет данных не гарантирована в случае, если
            доступ к этим данным получен третьими лицами вне зоны
            технический средств связи, подвластных Администрации сайта,
            Администрация сайта не несет никакой ответственности за ущерб,
            нанесенный таким доступом.
          </p>{" "}
          <p>
            3.5. Администрация сайта может использовать любую собранную
            через Сайт информацию с целью улучшения содержания
            интернет-сайта, его доработки, передачи информации Пользователю
            (по запросам), для маркетинговых или исследовательских целей, а
            также для других целей, не противоречащим положениям
            действующего законодательства РФ.
          </p>
          <h2>4. На Сайте запрещены:</h2>
          <p>
            4.1. Призывы к насильственному изменению или свержению
            конституционного строя или к захвату государственной власти;
            призывы к погромам, поджогам, уничтожению имущества, захвату
            зданий или сооружений, насильственному выселению граждан;
            призывы к агрессии или к развязыванию военного конфликта.
          </p>
          <p>
            4.2. Прямые и косвенные оскорбления кого-либо, в частности
            политиков, чиновников, журналистов, пользователей ресурса, в том
            числе по национальной, этнической, расовой или религиозной
            принадлежности, а также шовинистические высказывания.
          </p>
          <p>
            4.3. Нецензурные высказывания, высказывания порнографического,
            эротического или сексуального характера.
          </p>
          <p>
            4.4. Любое оскорбительное поведение по отношению к авторам
            постов и всем участникам ресурса.
          </p>
          <p>
            4.5. Высказывания, целью которых есть намеренное провоцирование
            резкой реакции других участников ресурса.
          </p>
          <p>
            4.6. Реклама, коммерческие сообщения, а также сообщения, которые
            не имеют информационной нагрузки и не касаются тематики ресурса,
            если на такую рекламу или сообщение не получено специального
            разрешения от Администрации сайта.
          </p>
          <p>
            {" "}
            4.7. Любые сообщения и прочие действия, которые запрещены
            законодательством РФ.
          </p>
          <p>
            4.8. Выдача себя за другого человека или представителя
            организации и/или сообщества без достаточных на то прав, в том
            числе за сотрудников и владельцев Сайта, а также введения в
            заблуждение относительно свойств и характеристик каких-либо
            субъектов или объектов.
          </p>
          <p>
            {" "}
            4.9. Размещение материалов, которые Пользователь не имеет права
            делать доступными по закону или согласно каким-либо контрактным
            отношениям, а также материалов, которые нарушают права на
            какой-либо патент, торговую марку, коммерческую тайну, копирайт
            или прочие права собственности и/или авторские и смежные с ним
            права третьей стороны.
          </p>
          <p>
            4.10. Размещение не разрешенной специальным образом рекламной
            информации, спама, схем &#34;пирамид&#34;, материалов содержащих
            компьютерные коды, предназначенные для нарушения, уничтожения
            либо ограничения функциональности любого компьютерного или
            телекоммуникационного оборудования или программ, для
            осуществления несанкционированного доступа, а также серийные
            номера к коммерческим программным продуктам, логины, пароли и
            прочие средства для получения несанкционированного доступа к
            платным ресурсам в Интернет.
          </p>
          <p>
            4.11. Размещение материалов порнографического характера в том
            числе с участием несоврешеннолетних.
          </p>
          <p>
            4.12. Размещение материалов с нацистской символикой и
            пропагандой нацизма.
          </p>
          <p>4.13. Призывы к суициду и членовредительству.</p>
          <p>
            4.14. Нарочное или случайное нарушения каких-либо применимых
            местных, государственных или международных нормативно – правовых
            актов.
          </p>
          <h2>5. Ограничение ответственности Администрации сайта</h2>
          <p>
            {" "}
            5.1. Администрация сайта не несет никакой ответственности за
            любые ошибки, опечатки и неточности, которые могут быть
            обнаружены в материалах, содержащихся на данном Сайте.
            Администрация сайта прикладывает все необходимые усилия, чтобы
            обеспечить точность и достоверность представляемой на Сайте
            информации.
          </p>
          <p>
            5.2. Информация на Сайте постоянно обновляется и в любой момент
            может стать устаревшей. Администрация сайта не несет никакой
            ответственности за получение устаревшей информации с Сайта, а
            также за неспособность Пользователя получить обновления
            хранящейся на Сайте информации.
          </p>
          <p>
            5.3. Администрация сайта не несет никакой ответственности за
            высказывания и мнения посетителей сайта, оставленные в качестве
            комментариев или обзоров. Мнение Администрация сайта может не
            совпадать с мнением и позицией авторов обзоров и комментариев. В
            то же время Администрация сайта принимает все возможные меры,
            чтобы не допускать публикацию сообщений, нарушающих действующее
            законодательство РФ или нормы морали.
          </p>
          <p>
            5.4. Администрация сайта не несет никакой ответственности за
            возможные противоправные действия Пользователя относительно
            третьих лиц, либо третьих лиц относительно Пользователя.
          </p>
          <p>
            {" "}
            5.5. Администрация сайта не несет никакой ответственности за
            высказывания Пользователя, произведенные или опубликованные на
            Сайте, а также за материалы и посты опубликованные
            пользователем, которые нарушают действующие законодательство РФ.
          </p>
          <p>
            {" "}
            5.6. Администрация сайта не несет никакой ответственности за
            ущерб, убытки или расходы (реальные либо возможные), возникшие в
            связи с настоящим Сайтом, его использованием или невозможностью
            использования.
          </p>
          <p>
            {" "}
            5.7. Администрация сайта не несет никакой ответственности за
            утерю Пользователем возможности доступа к своему аккаунту —
            учетной записи на Сайте.
          </p>
          <p>
            5.8. Администрация сайта не несет никакой ответственности за
            неполное, неточное, некорректное указание Пользователем своих
            данных при создании учетной записи Пользователя.
          </p>
          <p>
            {" "}
            5.9. При возникновении проблем в использовании Сайта, несогласия
            с конкретными разделами Пользовательского соглашения, либо
            получении Пользователем недостоверной информации от третьих лиц,
            либо информации оскорбительного характера, любой иной
            неприемлемой информации, пожалуйста, обратитесь к администрации
            Сайта по адресу электроной почты - CrystalHelpService@gmail.com,
            для того, чтобы Администрация сайта могла проанализировать и
            устранить соответствующие дефекты, ограничить и предотвратить
            поступление на Сайт нежелательной информации, а также, при
            необходимости, ограничить либо прекратить обязательства по
            предоставлению своих услуг любому Пользователю и клиенту,
            умышленно нарушающему предписания Соглашения и функционирование
            работы Сайта.
          </p>
          <p>
            5.10. В целях вышеизложенного Администрация сайта оставляет за
            собой право удалять размещенную на Сайте информацию и
            предпринимать технические и юридические меры для прекращения
            доступа к Сайту Пользователей, создающих согласно заключению
            Администрация сайта, проблемы в использовании Сайта другими
            Пользователями, или Пользователей, нарушающих требования
            Соглашения.
          </p>
          <h2>6. Порядок действия Соглашения</h2>
          <p>
            6.1. Настоящее Соглашение является договором. Администрация
            сайта оставляет за собой право как изменить настоящее
            Соглашение, так и ввести новое. Подобные изменения вступают в
            силу с момента их размещения на Сайте. Использование
            Пользователем материалов сайта после изменения Соглашения
            автоматически означает их принятие.
          </p>
          <p>
            6.2. Данное Соглашение вступает в силу при первом посещении
            Сайта Пользователем и действует между Пользователем и Компанией
            на протяжении всего периода использования Пользователем Сайта.
          </p>
          <p>
            6.3. Сайт является объектом права интеллектуальной собственности
            Администрации сайта. Все исключительные имущественные авторские
            права на сайт принадлежат Администрации сайта. Использование
            сайта Пользователями возможно строго в рамках Соглашения и
            законодательства РФ о правах интеллектуальной собственности.
          </p>
          <p>
            6.4. Все торговые марки и названия, на которые даются ссылки в
            материалах настоящего Cайта, являются собственностью их
            соответствующих владельцев.
          </p>
          <p>
            6.5. Пользователь соглашается не воспроизводить, не повторять,
            не копировать, какие-либо части Сайта, кроме тех случаев, когда
            такое разрешение дано Пользователю Администрацией сайта.
          </p>
          <p>
            6.6. Настоящее Соглашение регулируется и толкуется в
            соответствии с действующим законодательством РФ. Вопросы, не
            урегулированные Соглашением, подлежат разрешению в соответствии
            с действующим законодательством РФ.
          </p>
        </>
      ) : (
        <>
          <h1>User agreement of the social network CRYSTAL</h1>
          <p>
            1.1. This user agreement (hereinafter referred to as the
            Agreement) is an offer of conditions for using the website -
            www.crysty.ru (hereinafter - Site), represented by the Site
            Administration and an individual (including representatives of
            legal entities) (hereinafter referred to as the User), and
            regulating the conditions for the User to provide information
            for posting on the Site.
          </p>
          <p>
            1.2. A user of the Site is considered to be any individual who
            has ever accessed the Site and has reached the age permissible
            for accepting this Agreement.
          </p>
          <p>
            1.3. The User is obliged to fully familiarize himself with this
            Agreement before registering on the Site. Registration of the
            User on the Site means the User&#39;s full and unconditional
            acceptance of this Agreement. In case of disagreement with the
            terms of the Agreement, the use of the Site by the User must be
            immediately terminated.
          </p>
          <p>
            1.4. This Agreement is located at www.crysty.ru/terms, and can
            be changed and/or supplemented by the Site Administration
            unilaterally order, without any special notice. This Agreement
            is an open and publicly available document.
          </p>
          <p>
            1.5. The Agreement provides for the mutual rights and
            obligations of the User and the Site Administration.
          </p>
          <h2>2. Procedure for using the Site</h2>
          <p>
            2.1. When registering on the site, the User agrees to provide
            reliable and accurate information about himself and his contact
            information.
          </p>
          <p>
            2.2. During the registration process on the site, the User
            receives a login and password, for the security of which he
            bears personal responsibility.
          </p>
          <p>
            {" "}
            2.3. The user can contact the site Administration with
            questions, complaints, suggestions for improving work, or any
            other information, by email - CrystalHelpService@gmail.com. At
            the same time, the User is responsible that this message is not
            illegal, threatening, violates copyrights, discriminates against
            people on any basis, and also contains insults or otherwise
            violates the current legislation of the Russian Federation.
          </p>
          <p>
            2.4. The site administration reserves the right to delete the user's account and their personal data, as well as any materials that were published by the user on the site, or to block the account for any time, as well as to delete or restrict access to the user's posts and various materials, without explanation.
          </p>
          <h2>3. User&#39;s personal information</h2>
          <p>
            {" "}
            3.1. The site administration treats the confidential information
            of any person who has become a visitor to this site with respect
            and responsibility. By accepting this Agreement, the User agrees
            to the collection, processing and use of certain information
            about the User in accordance with the provisions of Federal
            Law-152 “On the Protection of Personal Data”. In addition, the
            user agrees that the Site Administration can collect, use,
            transfer, process and maintain information associated with the
            User’s account in order to provide relevant services.
          </p>
          <p>
            3.2. The site administration undertakes to collect only that
            personal information that the Consumer provides voluntarily in
            the event that the information is needed to provide (improve)
            services to the Consumer.
          </p>
          <p>
            3.3. The site administration collects both basic personal data,
            such as first name, last name, email address, and secondary
            (technical) data - cookies, connection information and system
            information.
          </p>
          <p>
            3.4. The user agrees that the confidentiality of data
            transmitted via the Internet is not guaranteed if access to this
            data is obtained by third parties outside the area of technical
            means of communication under the control of the Site
            Administration. The Site Administration does not bear any
            responsibility for damage caused by such access.
          </p>{" "}
          <p>
            3.5. The site administration may use any information collected
            through the Site in order to improve the content of the website,
            refine it, transfer information to the User (upon request), for
            marketing or research purposes, as well as for other purposes
            that do not contradict the provisions of the current legislation
            of the Russian Federation.
          </p>
          <h2>4. The following are prohibited on the Site:</h2>
          <p>
            4.1. Calls for a violent change or overthrow of the
            constitutional order or for the seizure of state power; calls
            for pogroms, arson, destruction of property, seizure of
            buildings or structures, and forced eviction of citizens; calls
            for aggression or the outbreak of a military conflict.
          </p>
          <p>
            4.2. Direct and indirect insults to anyone, in particular
            politicians, officials, journalists, resource users, including
            on the basis of national, ethnic, racial or religious
            affiliation, as well as chauvinistic statements.
          </p>
          <p>
            4.3. Obscene statements, statementspornographic, erotic or
            sexual in nature.
          </p>
          <p>
            4.4. Any offensive behavior towards the authors of posts and all
            participants of the resource.
          </p>
          <p>
            4.5. Statements the purpose of which is to deliberately provoke
            a sharp reaction from other participants in the resource.
          </p>
          <p>
            4.6. Advertising, commercial messages, as well as messages that
            do not have an informational load and do not relate to the
            subject of the resource, unless special permission is received
            for such advertising or message from the Site Administration.
          </p>
          <p>
            {" "}
            4.7. Any messages and other actions that are prohibited by the
            legislation of the Russian Federation.
          </p>
          <p>
            4.8. Impersonating another person or representative of an
            organization and/or community without sufficient rights,
            including employees and owners of the Site, as well as
            misrepresentation regarding the properties and characteristics
            of any subjects or objects.
          </p>
          <p>
            {" "}
            4.9. Posting materials that the User does not have the right to
            make available by law or under any contractual relationship, as
            well as materials that violate the rights to any patent,
            trademark, trade secret, copyright or other proprietary rights
            and/or copyright and related rights third party rights with it.
          </p>
          <p>
            4.10. Posting advertising information that is not specifically
            permitted, spam, pyramid schemes, materials containing computer
            codes intended to disrupt, destroy or limit the functionality of
            any computer or telecommunications equipment or programs for
            unauthorized access, as well as serial numbers for commercial
            software products, logins, passwords and other means for gaining
            unauthorized access to paid resources on the Internet.
          </p>
          <p>
            4.11. Posting pornographic materials, including those involving
            minors.
          </p>
          <p>
            4.12. Posting materials with Nazi symbols and Nazi propaganda.
          </p>
          <p>4.13. Calls for suicide and self-harm.</p>
          <p>
            4.14. Intentional or accidental violation of any applicable
            local, state or international regulations.
          </p>
          <h2>5. Limitation of liability of the Site Administration</h2>
          <p>
            {" "}
            5.1. The site administration does not bear any responsibility
            for any errors, typos or inaccuracies that may be found in the
            materials contained on this Site. The site administration makes
            every effort to ensure the accuracy and reliability of the
            information presented on the Site.
          </p>
          <p>
            5.2. The information on the Site is constantly updated and may
            become out of date at any time. The site administration does not
            bear any responsibility for receiving outdated information from
            the Site, as well as for the User’s inability to receive updates
            to the information stored on the Site.
          </p>
          <p>
            5.3. The site administration does not bear any responsibility
            for the statements and opinions of site visitors left as
            comments or reviews. Opinion The site administration may not
            coincide with the opinion and position of the authors of reviews
            and comments. At the same time, the site administration takes
            all possible measures to prevent the publication of messages
            that violate the current legislation of the Russian Federation
            or moral standards.
          </p>
          <p>
            5.4. The site administration does not bear any responsibility
            for possible illegal actions of the User regarding third
            parties, or third parties regarding the User.
          </p>
          <p>
            {" "}
            5.5. The site administration does not bear any responsibility
            for the User&#39;s statements made or published on the Site, as well
            as for materials and posts published by the user that violate
            the current legislation of the Russian Federation.
          </p>
          <p>
            {" "}
            5.6. The site administration does not bear any responsibility
            for damage, losses or expenses (real or possible) arising in
            connection with this Site, its use or inability to use.
          </p>
          <p>
            {" "}
            5.7. The site administration does not bear any responsibility
            for the User’s loss of access to his account - account on the
            Site.
          </p>
          <p>
            5.8. The site administration does not bear any responsibility
            for incomplete, inaccurate, or incorrect indication by the User
            of his data when creating a User account.
          </p>
          <p>
            {" "}
            5.9. If problems arise in using the Site, disagreement with
            specific sections of the User Agreement, or the User receives
            false information from third parties, or information of an
            offensive nature, or any other unacceptable information, please
            contact the Site administration by email -
            CrystalHelpService@gmail.com, so that the Site Administration
            can analyze and eliminate relevant defects, limit and prevent
            the entry of unwanted information to the Site, and, if
            necessary, limit or terminate obligations to provide their
            services to any User and client who deliberately violates the
            provisions of the Agreement and the functioning of the Site.
          </p>
          <p>
            5.10. For the purposes of the above, the Site Administration
            reserves the right to delete information posted on the Site and
            take technical and legal measures to terminate access to the
            Site for Users who, according to the conclusion of the Site
            Administration, create problems in the use of the Site by other
            Users, or Users who violate the requirements of the Agreement.
          </p>
          <h2>6. Procedure for the Agreement</h2>
          <p>
            6.1. This Agreement is a contract. The site administration
            reserves the right to both change this Agreement and introduce a
            new one. Such changes come into force from the moment they are
            posted on the Site. The User’s use of site materials after
            changing the Agreement automatically means their acceptance.
          </p>
          <p>
            6.2. This Agreement comes into force upon the first visit to the
            Site by the User and is valid between the User and the Company
            throughout the entire period of use of the Site by the User.
          </p>
          <p>
            6.3. The site is the subject of intellectual property rights of
            the Site Administration. All exclusive property copyrights to
            the site belong to the Site Administration. Use of the site by
            Users is possible strictly within the framework of the Agreement
            and the legislation of the Russian Federation on intellectual
            property rights.
          </p>
          <p>
            6.4. All trademarks and names referenced in the materials on
            this Site are the property of their respective owners.
          </p>
          <p>
            6.5. The User agrees not to reproduce, repeat, copy any parts of
            the Site, unless such permission is given to the User by the
            Site Administration.
          </p>
          <p>
            6.6. This Agreement is governed by and construed in accordance
            with the current legislation of the Russian Federation. Issues
            not regulated by the Agreement shall be resolved in accordance
            with the current legislation of the Russian Federation.
          </p>
        </>
      )}
    </div>
  );
};
