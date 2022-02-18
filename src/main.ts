import Container from "./service/Container";
import { Product } from "./models/Product";

const container = new Container('public', 'products.txt')

// THIS METHODS WILL LOG ERRORS IF FILE DOES NOT EXIST
container.deleteById(3);
container.deleteAll();
container.getAll();
container.getById(3);

const product = new Product('Iphone 8 Plus', 300);
const product2 = new Product('Samsung Galaxy S20', 400);
const product3 = new Product('Iphone 11 Pro', 750);
const product4 = new Product('Apple watch', 150);

(async () => {
  // WE CREATE OUR DATA HERE
  await container.save(product);
  await container.save(product2);
  const firstIdToLog = await container.save(product3);
  
  // LETS LOG OUR DATA SO FAR
  const firstData = await container.getAll();
  console.log(firstData);
  console.log('Last element id is: ' + firstIdToLog);
  const element = await container.getById(2);
  console.log(element);

  // MANIPULATING DATA
  await container.deleteById(2);
  const secondIdToLog = await container.save(product4);

  // LOGS AFTER DELETING ID 2 AND ADDING OTHER PRODUCT
  const secondData = await container.getAll();
  console.log(secondData);
  console.log('Last element id is: ' + secondIdToLog);

  // DELETE ALL DATA ( NOT THE FILE )
  await container.deleteAll()
  const thirdData = await container.getAll()
  console.log(thirdData)
})()