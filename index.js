const { Builder, By, Key, until, Select } = require("selenium-webdriver");

async function example() {
  let driver = await new Builder().forBrowser("firefox").build();
  try {
    await driver.get(
      "https://foreclosuresearch.arapahoegov.com/foreclosure/index.aspx"
    );

    const inputValue = "Accept Terms";
    const xpathExpression = `//input[@value='${inputValue}']`;

    // Wait for the element to be present
    await driver.wait(until.elementLocated(By.xpath(xpathExpression)), 5000);

    // Find the input element
    const inputElement = await driver.findElement(By.xpath(xpathExpression));

    // Click the found element
    await inputElement.click();

    // Calculate the date 240 days ago
    const currentDate = new Date();
    const date240DaysAgo = new Date(currentDate);
    date240DaysAgo.setDate(currentDate.getDate() - 240);

    // Format the date as needed (assuming MM/DD/YYYY format)
    const formattedDate = `${
      date240DaysAgo.getMonth() + 1
    }/${date240DaysAgo.getDate()}/${date240DaysAgo.getFullYear()}`;

    // Find the datepicker input by ID
    const datepickerInput = await driver.findElement(
      By.id("ctl00_ContentPlaceHolder1_txtNedDate1")
    );

    // Find the dropdown element by ID
    const dropdownElement = await driver.findElement(
      By.id("ctl00_ContentPlaceHolder1_ddStatus")
    );

    // Create a new Select object
    const dropdown = new Select(dropdownElement);

    // Select the value by visible text
    await dropdown.selectByVisibleText("NED Recorded");

    // Clear the existing value (optional)
    await datepickerInput.clear();

    // Type the formatted date into the input
    await datepickerInput.sendKeys(formattedDate, Key.RETURN);

    const inputValueTwo = "Show All";
    const xpathExpressionTwo = `//input[@value='${inputValueTwo}']`;

    // Wait for the element to be present
    await driver.wait(until.elementLocated(By.xpath(xpathExpressionTwo)), 5000);

    // Find the input element
    const inputElementTwo = await driver.findElement(
      By.xpath(xpathExpressionTwo)
    );

    // Click the found element
    try {
      console.log("showing all...");
      await inputElementTwo.click();
    } catch (e) {
      console.log("we ran into some problem clicking the show all button.");
    }

    // Wait for 10 seconds
    await sleep(10000);

    // Find all table rows
    const SearchResultRows = await driver.findElements(
      By.className("SearchResultsGridRow")
    );

    for (const row of SearchResultRows) {
      // Find all cells in the current row
      const cells = await row.findElements(By.tagName("td"));

      // Extract data from specific cells
      const linkCell = cells[0];
      const ownerNameCell = cells[1];
      const addressCell = cells[2];
      const zipCodeCell = cells[3];

      // Extract data from the cells
      const link = await linkCell
        .findElement(By.tagName("a"))
        .getAttribute("href");
      const ownerName = await ownerNameCell.getText();
      const addressLine1 = await addressCell.getText();
      const zipCode = await zipCodeCell.getText();

      // Print or use the extracted data as needed
      console.log("Link:", link);
      console.log("Owner Name:", ownerName);
      console.log("Address Line 1:", addressLine1);
      console.log("ZIP Code:", zipCode);
      console.log("----------------------------------------");
    }
  } finally {
    // await driver.quit();
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

example();
