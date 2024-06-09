<a name="readme-top"></a>


<!-- PROJECT SHIELDS -->
[![Issues][issues-shield]][issues-url]
[![GNU License][license-shield]][license-url]
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/paulmuenzner/node-template)
![GitHub top language](https://img.shields.io/github/languages/top/paulmuenzner/node-template)
[![paulmuenzner github][github-shield]][github-url] 
[![Contributors][contributors-shield]][contributors-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">Node.js Template</h3>

  <p align="center">
    Clustering - Logging - Testing - Error/Response Handler
    <br />
    <a href="#about-the-project"><strong>EXPLORE DOCS</strong></a>
    <br />
    <br />
    <a href="#about-the-project">Plenty of features</a>
    ·
    <a href="https://github.com/paulmuenzner/node-template/issues">Report Bug</a>
    ·
    <a href="https://github.com/paulmuenzner/node-template/issues">Request Feature</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This repository provides a comprehensive Node.js template designed for building robust and scalable web applications. It integrates essential features and best practices to streamline the development process. This template is fully implemented in TypeScript and includes various functionalities such as route validation, CORS, security enhancements, logging, and more.


### Features
- **Express**: Built with Express, a fast and minimalist web framework for Node.js.
- **TypeScript**: Fully implemented in TypeScript for improved developer experience and code quality.
- **Dependency Injection & Inversion of Control**: Decoupled components. Programmed against interfaces with architectural boundary.
- **Testing**: Jest implemented for solid state-of-the-art testing.
- **Route Validation**: Ensure the integrity of incoming requests with robust route validation.
- **CORS**: Configurable Cross-Origin Resource Sharing support for your application.
- **Helmet**: Enhanced security with Helmet middleware, including permitted cross-domain policies.
- **Rate Limiter**: Prevent abuse and ensure fair usage with a built-in rate limiting mechanism.
- **Health Check Route**: Easily monitor the health of your application with a dedicated health check endpoint.
- **Swagger Implementation**: Automatically generated API documentation available at `http://localhost:8000/docs`.
- **Node Cluster**: Leverage the Node.js cluster module to create child processes that run simultaneously and share the same server port, enhancing the performance of your application.
- **Logging**: Comprehensive logging setup with Winston and daily rotating log files for better traceability and debugging.
- **Nodemon**: Automatically restart the server during development when file changes in the directory are detected.
- **Prettier**: Maintain consistent code formatting with Prettier.
- **Async Error Handling**: All controllers are wrapped in a `catchAsync` utility to handle errors gracefully and keep the codebase clean.
- **Custom Response Handler**: Consistent API responses with a custom response handler that defines standard response structures for success, failure, internal errors, authentication errors, and more.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE -->
## Usage

Clone the repository and install the dependencies:

```bash
git clone https://github.com/paulmuenzner/node-template.git
cd node-template
npm install
```

Build and start:

```bash
npm run build
npm run start
```

Test:

```bash
npx jest
```

Test coverage:

```bash
npx jest --coverage
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions to the Node.js template project are welcome! Whether you're interested in adding new features, fixing bugs, or improving documentation, your contributions are highly valued. To get started, fork the repository, make your changes, and submit a pull request. 

See [CONTRIBUTING.md](CONTRIBUTING.md) for more info.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the GNU General Public License v2.0. See [LICENSE](LICENSE.txt) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Paul Münzner: [https://paulmuenzner.com](https://paulmuenzner.com) 

Project Link: [https://github.com/paulmuenzner/node-template](https://github.com/paulmuenzner/node-template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[mongodb-shield]: https://img.shields.io/badge/mongodb-black.svg?logo=mongodb&logoColor=ffffff&colorB=47A248
[mongodb-url]: https://go.dev/
[github-shield]: https://img.shields.io/badge/paulmuenzner-black.svg?logo=github&logoColor=ffffff&colorB=000000
[github-url]: https://github.com/paulmuenzner?tab=repositories
[contributors-shield]: https://img.shields.io/github/contributors/paulmuenzner/node-template.svg
[contributors-url]: https://github.com/paulmuenzner/node-template/graphs/contributors
[issues-shield]: https://img.shields.io/github/issues/paulmuenzner/node-template.svg
[issues-url]: https://github.com/paulmuenzner/node-template/issues
[license-shield]: https://img.shields.io/badge/license-GPL_2.0-orange.svg?colorB=FF5733
[license-url]: https://github.com/paulmuenzner/node-template/blob/master/LICENSE.txt
<!-- [website-shield]: https://img.shields.io/badge/www-paulmuenzner.com-blue
[website-url]: https://paulmuenzner.com -->
