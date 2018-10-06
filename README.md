Тестовое задание для компании [Head &amp; Hands](https://handh.ru/) | Test case for company [Heads &amp; Hands](https://handh.ru/)

Посмотреть собранную версию: [nskye.github.io/sample-info-page/](https://nskye.github.io/sample-info-page/)  
Посмотреть скриншоты на различных разрешениях можно [тут](https://github.com/NSkye/sample-info-page/tree/master/screenshots),  моему устройству соответствует [1920x1080](https://github.com/NSkye/sample-info-page/blob/master/screenshots/desktop_1920x1080.png)   
Код с русскоязычными комментариями: ветка [ru_comments](https://github.com/NSkye/sample-info-page/tree/ru_comments)  

Разрабатывалось из-под Manjaro, так что, из-под Linux точно будет собираться и работать как надо.  
Проверено в Chromium-браузерах, Firefox и Edge, не удалось проверить в Safari, так как нет в распоряжении никакой техники от Apple.  
Возможно, в некоторых браузерах потребуется отключить Tracking Protection

Запуск:
```
npm i
npm start
```
Сборка:
```
npm run build
```
### Навигация
[Издержки](#expenses)  
[Инструменты и всё такое](#instr)  
[Принципы работы](#core)  

### <a name='expenses'></a> Издержки
1. В свободном доступе нет шрифта Muller, поэтому был использован шрифт Roboto.
2. Балун немного отличается от макета в силу того, что в макете не было соответствующего ассета.
3. Возможно, на мобильной версии список адресов мелковат, хоть я и старался оставить его как можно более крупным, обусловлено это требованием перемещения боковой панели под карту в техническом задании, я не смог найти лучших дизайнерских решений, чем текущее.
4. В адаптивности был совсем немного использован JS (конкретно в хэдере, в элементе, отвечающем за навигацию), несмотря на то, что в переписке представители просили его не использовать. Использование JS в этом месте и вправду не обязательно и это спокойно переписывается под CSS в пару строчек, тем не менее, я посчитал, что в данном месте это будет более чисто и органично, так как это предоставило возможность использовать Vue transition и директиву v-show для открытия/закрытия навигации в мобильной версии. Да, это всё можно реализовать на чистом CSS, но это бы привело к большему количеству CSS-классов и разрастанию кода стилей компонента.

### <a name='instr'></a> Инструменты и всё такое
#### Vue
В техническом задании указано, что предпочтение отдается Angular, однако, из диалога с представителями я узнал, что всё же Vue предпочтительнее. Я, в принципе, и не против, мне нравится.
#### Vuex
Используется тут для синхронизации компонента карты и компонента со списком городов. А также для выполнения некоторых асинхронных запросов.
#### Webpack
В техническом задании указано, что использование Gulp для сборки предпочтительнее. Тут отдано предпочтение Webpack по двум причинам:
1. Инструменты для сборки Vue-проектов под Gulp уже не имеют поддержки от их разработчиков
2. Webpack мне кажется более предпочтительным для сборки таких небольших одностраничных приложений
На случай, если проверяющие не используют у себя webpack, файл конфига был сделан максимально небольшим и везде где может возникнуть недопонимание оставлены комментарии.
#### Stylus
Опять же, в техническом задании отдается предпочтение SASS, однако в виду того, что npm детектит достаточно много уязвимостей в sass-loader для вебпак, я решил отдать предпочтение Stylus, у него достаточно схожий функционал.
#### ESLint и StandardJS
Используются для поддержания единого стиля кода. Конфиг ESLint'а также снабжен комментариями. Выбор StandardJS в качестве базы для конфига обусловлен лишь желанием опробовать его, так как до этого я использовал другие конфигурации.
#### Yandex Maps API и Yandex Geocode API
В целом в задании не указано API каких карт стоит использовать. Могу сказать только, что с 11 Июня 2018 года Google Maps API [обязательно требуют API-key и регистрацию своего приложения](https://developers.google.com/maps/billing/important-updates). С Яндекс Картами такой проблемы нет. Ну и Yandex Geocode API тут же, потому что мы всё равно уже используем Яндекс Карты, зачем далеко ходить за координатами?

### <a name='core'></a> Принципы работы
В целом, приложение достаточно простое и не требует дополнительных объяснений. Однако, есть моменты, о которых стоит рассказать подробнее.
#### Конфиг проекта
Весь контент собран в файле `./src/app.config.js`, который доступен по алиасу `config`. В боевых условиях это, конечно, неплохо бы было подгружать с сервера, но в его отсутствии это наиболее удобное решение.
#### Общение между компонентом с картой и компонентом со списком городов
Как уже писал выше, их синхронизация осуществляется через Vuex. Состояние я постарался сделать как можно более небольшим. В состоянии хранится только массив объектов, каждый из которых соответствует элементу в списке городов и представляет что-то вроде этого: `{ key:Number, icon:String, lat:Number, lon:Number }`, где key - это уникальный идентификатор элемента, icon - ссылка на иконку (у нас тут звездочка и якорь), lat и lon - широта и долгота соответственно. Таким образом компонент с картой не знает ничего про список адресов, единственная информация, которая ему приходит -- координаты и иконка, по которым он определяет куда переместить центр карты и поставить балун и какую иконку прикрутить к этому балуну.
#### Определение мест на карте в которых будут размещаться балуны
При инициализации приложения, а именно после маунта компонентов элемента списка, делается запрос к Yandex Geocode API, через который уже ищутся координаты по адресу, указанному в компоненте. В боевых условиях по-хорошему это надо делать со стороны сервера, сохранять на бэкэнде координаты и не делать запрос к Geocode API при каждом запуске приложения. Так что подобные операции на стороне клиента -- исключительно издержка в силу отсутствия бэкэнда.
