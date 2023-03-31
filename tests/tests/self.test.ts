import parameters from "./GlobalVariables"
import ENV from "../src/utils/env"
import { test, expect } from '@playwright/test'
import fs from 'fs';

test('Parameters Check ', async ({ page }) => {
    console.log ("This test prints out the selected environment variables")
    console.log('\n' + 'Test running in ' + ENV.ENV_TYPE + '\n');
    console.log(ENV.BASE_URL);
    console.log(ENV.USERNAME);
    console.log(ENV.PASSWORD);
    console.log("\n")
    //add test steps here
    
});
test('Test 1 ', async ({ page }) => {
    console.log("Test 1\n")
    //add test steps here

});
test('Test 2 ', async ({ page }) => {
    console.log("Test 2\n")
    //add test steps here

});

test('Test 3 ', async ({ page }) => {
    console.log("Test 3\n")
    //add test steps here

});
