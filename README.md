# Red Hat iPaaS API

[![CircleCI](https://img.shields.io/circleci/project/github/redhat-ipaas/ipaas-rest.svg)](https://circleci.com/gh/redhat-ipaas/ipaas-rest)
[![AppVeyor](https://img.shields.io/appveyor/ci/jimmidyson/ipaas-rest/master.svg)](https://ci.appveyor.com/project/jimmidyson/ipaas-rest/)
[![Maven Central](https://img.shields.io/maven-central/v/com.redhat.ipaas/ipaas-rest.svg)](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22redhat-ipaas%22%20AND%20a%3A%22ipaas-rest%22)
[![Dependency Status](https://dependencyci.com/github/redhat-ipaas/ipaas-rest/badge)](https://dependencyci.com/github/redhat-ipaas/ipaas-rest)

- [Building](#building)
- [Running](#run-in-development-mode)
- [Deploying](#deploying-to-kubernetes)
- [Endpoints](#endpoints)

### Swagger
[![Swagger](http://dgrechka.net/swagger_validator_content_type_proxy.php?url=https://circleci.com/api/v1/project/redhat-ipaas/ipaas-rest/latest/artifacts/0/$CIRCLE_ARTIFACTS/swagger.json)](https://online.swagger.io/validator/debug?url=https://circleci.com/api/v1/project/redhat-ipaas/ipaas-rest/latest/artifacts/0/$CIRCLE_ARTIFACTS/swagger.json)

# Building

    mvn clean install

# Run in development mode

Linux:

    ./start-with-keycloak.sh
    
Windows:

    start-with-keycloak

# Deploying to Kubernetes

    oc login <KUBERNETES_MASTER>
    cd runtime
    mvn clean package fabric8:build fabric8:deploy fabric8:start

# Endpoints

    REST service: http://localhost:8080/api/v1/
    Swagger doc:  http://localhost:8080/api/v1/swagger.json

There is a [staging URL](https://ipaas-staging.b6ff.rh-idev.openshiftapps.com/api/v1/) on OpenShift dedicated that you can test with, along with the [Swagger JSON](https://ipaas-staging.b6ff.rh-idev.openshiftapps.com/api/v1/swagger.json).

This demo endpoint has some preloaded data and can be used for testing and demoing purposes.

# Authentication

Authentication is provided by KeyCloak. At the moment authentication is turned on and you will need to allow access to OpenShift using your GitHub account.
