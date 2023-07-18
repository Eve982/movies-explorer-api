### Бэкенд сервиса Movies-Explorer, в котором можно найти фильмы по запросу и сохранить в личном кабинете.

Фронтенд проекта находится [здесь](https://github.com/Eve982/movies-explorer-frontend).

- Frontend https://ola.sytes.net/
- Backend https://api.ola.sytes.net/

Приложение предоставляет возможность найти фильмы по запросу и сохранить в личном кабинете.

## Технологии:
![JavaScript](https://img.shields.io/badge/-JavaScript-090909?style=for-the-badge&logo=JavaScript)
![Node.js](https://img.shields.io/badge/-Node.js-090909?style=for-the-badge&logo=Node.js)
![Express](https://img.shields.io/badge/-Express-090909?style=for-the-badge&logo=Express)
![MongoDB](https://img.shields.io/badge/-MongoDB-090909?style=for-the-badge&logo=MongoDB)
![dotenv](https://img.shields.io/badge/-dotenv-090909?style=for-the-badge&logo=dotenv)
![nodemon](https://img.shields.io/badge/-nodemon-090909?style=for-the-badge&logo=nodemon)
![eslint](https://img.shields.io/badge/-eslint-090909?style=for-the-badge&logo=eslint)
![Postman](https://img.shields.io/badge/-Postman-090909?style=for-the-badge&logo=Postman)
![Winston](https://img.shields.io/badge/-Winston-090909?style=for-the-badge&logo=Winston)
![Celebrate](https://img.shields.io/badge/-Celebrate-090909?style=for-the-badge&logo=Celebrate)
![Validator](https://img.shields.io/badge/-Validator-090909?style=for-the-badge&logo=Validator)
![JsonWebToken](https://img.shields.io/badge/-JsonWebToken-090909?style=for-the-badge&logo=JsonWebToken)
![bcrypt](https://img.shields.io/badge/-bcrypt-090909?style=for-the-badge&logo=bcrypt)

## Функционал API:
- Регистрация;
- Авторизация;
- Редактирование профиля;
- Поиск фильмов по ключевым словам;
- Сохранение фильмов в раздел "Сохраненные фильмы".

## Директории backend-части приложения (папка backend):
- `/controllers` — обработчики данных
- `/errors` - возможные ошибки приложения
- `/middlewares` - промежуточные обработчики авторизации, CORS-запросов, валидации и логов
- `/models` — схемы БД
- `/routes` — маршруты
- `/utils` — вспомогательные утилиты и константы.

## Директории React-приложения (папка frontend):
- `/public`- содержит файлы, которые должны быть скопированы в папку build (папку сборки) нетронутыми;
- `src/blocks` - CSS-файлы;
- `src/components` - компоненты React-приложения;
- `src/context` - файлы контекста;
- `src/images` - изображения, используемые в проекте;
- `src/utils` - API, а также переменные приложения;
- `src/vendor` - файлы шрифтов.

## Копирование проекта на локальную машину:
Для клонирования и запуска проекта на Вашей локальной машине должны быть установлены:
- git (при отсутствии можно копировать проект архивами);
- npm;
- Node.js.

Все команды необходимо выполнять в командной строке Вашего ПК.
Создайте пустую папку <b>movies-explorer</b> на локальной машине.

Проект состоит из двух частей: фронтенд и бэкенд. Каждая часть находится в отдельном git-репозитории. Поэтому в основной папке movies-explorer создайте 2 подпапки: <b>frontend</b> и <b>backend</b>.

Выполните клонирование репозиториев в соответствующие подпапки выполнением следующих команд в командной строке:
```
git clone <сссылка на проект>
```

если Вы используете SSH-подключение, то, вместо <сссылка на проект>, укажите (бэкенд и фронтенд соответственно):
```
git@github.com:Eve982/movies-explorer-api.git
```
```
git@github.com:Eve982/movies-explorer-frontend.git
```

если Вы используете HTTPS-подключение - укажите следующую ссылку:
```
https://github.com/Eve982/movies-explorer-api.git
```
```
https://github.com/Eve982/movies-explorer-frontend.git
```
После клонирования репозиториев выполните установку зависимостей командой:
```
npm install
```
в обеих подпапках проекта.

## Локальный запуск проекта:
Для запуска данного проекта локально Вам поднадобиться открыть 2 окна терминала. 

В первом окне терминала находясь в папке <b><название_папки_Вашего_проекта>/backend</b> выполнить команду для запуска сервера:
```
npm run start
```

или команду для запуска сервера в режиме разработчика если Вы планируете вносить изменения в приложение:
```
npm run dev
```
Сервер на Node.js по-умолчанию запускается на 3000-м порту.

Во втором окне терминала находясь в папке <b>movies-explorer/frontend</b> выполнить команду для запуска React-приложения:
```
npm start
```

React-приложение также по-умолчанию запускается на 3000 порту, поэтому после выполнения последней команды Вам надо будет ответить на следующий вопрос:
```
Would you like to run the app on another port instead? › (Y/n)
```

введите 'y'.

Проект должен быть доступен по адресу:
```
http://localhost:3001/signin
```

Номер порта может быть иной в зависимости от того, какой ближайший порт будет свободен на Вашей машине.

Если Ваш проект запущен на ином порте, нежели 3001 или 3002, Вам необходимо добавить строку адреса с Вашим портом в список разрешенных адресов ALLOWED_CORS в [файл /movies-explorer-api/backend/utils/constants.js](./movies-explorer-api/backend/utils/constants.js) в таком формате:
```
'http://localhost:<номер_порта>',
```

Для остановки сервера и React-приложения в каждом терминале необходимо выполнить команду Ctrl+C.

<!-- ## Планы по доработке проекта
- доработать swagger-доку в ветке redoc;
- настроить CI/CD;
- добавить возможность удаления профиля. -->

### **Автор**
[Ольга Боброва](https://github.com/eve982)

<!-- ## Заметка для рыбки Дори!

Если возникнут проблемы с деплоем, то необходимо проверить как работает модуль frontend/src/utils/constants.js который ты добавила. Данный модуль используется в следующих файлах:
- [/react-mesto-api-full/backend/utils/Api.js](/react-mesto-api-full/backend/utils/Api.js);
- [/react-mesto-api-full/backend/utils/Auth.jsx](/react-mesto-api-full/backend/utils/Auth.jsx). -->
