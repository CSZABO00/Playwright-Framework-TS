# Agendia-us-automation

## Running tests locally
- Node.js installed  
- Docker installed  
- Playwright installed  

To run a test locally, clone the repository from git, cd into the directory then use  the following commands:
>npm install  

>npm run env:test


To access the code generator feature of Playwright, use the following command:
>npx playwright codegen

To create a dockerfile, cd into the root directory, then run the following command:
>docker build -t playwright-docker -f cicd/docker/Dockerfile .

## Multiple Environments 
Environment parameters can be configured in the .env files found in the **/helpers/env/** directory

1. Contents of the env directory
   - .env.dev
   - .env.integration
   - .env.staging
   - .env.test


2. The URL, Username and Password can be customized depending on the needed environment
### Example .env file
>ENV_TYPE = "Test Environment"  
>BASE_URL = "https://integration.v2.stratus.illumina.com/agendia-adapt-us"  
>USERNAME = "AUS_AUTO_INT_C001@illumina.com"  
>PASSWORD = "WSauto1!"


3. Parameters to run the tests using the desired environment

Use the following command to run the tests in the test environment. note that the environment can be changed by replacing the "env:test" parameter to the desired environment

>docker run -it playwright-docker:latest npm run env:test

4. Environment configuration

Environment parameters can be found in the package.json file under the scripts section

>"env:test": "cross-env test_env=test npx playwright test --browser=chromium --reporter=html",  
>"env:integration": "cross-env test_env=integration npx playwright test --browser=chromium --reporter=html",  
>"env:staging": "cross-env test_env=staging npx playwright test --browser=chromium --reporter=html",  
>"env:development": "cross-env test_env=dev npx playwright test --browser=chromium --reporter=html",  
>"env:prod": "cross-env test_env=prod npx playwright test --browser=chromium --reporter=html"  

5. Global multi-environment setup

The multiple environment setup configured in the "playwright.config.ts" file

>globalSetup: "src/utils/globalSetup.ts"  

6. The globalSetup.ts file links the .env file to the test based on the previous parameters
>import dotenv from "dotenv"  
>async function globalSetup(config: FullConfig) {  
>  
>    if (process.env.test_env) {  
>       dotenv.config({  
>           path: `helpers/env/.env.${process.env.test_env}`,  
>            override: true  
>        })}}    
>export default globalSetup;  

7. Tests import the environment parameters from the env.ts file
>import ENV from "../src/utils/env"

8. The env.ts file content

>export default class env{  
>public static ENV_TYPE = process.env.ENV_TYPE  
>public static BASE_URL = process.env.BASE_URL  
>public static USERNAME = process.env.USERNAME  
>public static PASSWORD = process.env.PASSWORD  
>}  


## Test Configuration and multiple tests in a file
The minimum dependencies for a test to function properly are the following:
>import parameters from "./GlobalVariables"  
>import ENV from "../src/utils/env"  
>import { test, expect } from '@playwright/test'  
>import fs from 'fs';
## Adding Test files
Tests are added under the "tests/" directory having the *.test.ts format, which is the default configuration  

example: self.test.ts

Note: *.spec.ts is also a valid format. customizing this can be done by adding the following key:value pair to the playwright.config.ts file
>testMatch: 'tests/.spec.ts'
> 
> 
## Multiple tests in a file
One test file can contain multiple tests
>import parameters from "./GlobalVariables"  
>import ENV from "../src/utils/env"  
>import { test, expect } from '@playwright/test'  
>import fs from 'fs';
>
>test('Test 1 ', async ({ page }) => {  
>console.log("Test 1\n")  
>//add test steps here  
>});  
>test('Test 2 ', async ({ page }) => {  
>console.log("Test 2\n")  
>//add test steps here  
>});
## 4.Customization


## 5. Implementation status
- [x] Agendia - US Smoke test
- [ ] Agendia - US Sanity test
- [x] Multiple Environments
- [ ] Test Setup and Teardown
- [X] Adding Additional tests

## 6. Run parameters
Running the tests in the "test" environment
>docker run -it playwright-docker:latest npm run env:test

Running the tests in the "integration" environment
>docker run -it playwright-docker:latest npm run env:integration

