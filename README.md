# ESEP: Extra Credit Assignment : Data Processing and Storage Assignment
## Getting Started
This project contains a [**db.js**](./db.js) file which exports the InMemoryDatabase class, as well as a [Mocha](https://mochajs.org) [test suite](./test/test.js) for evaluating the functionality of the InMemoryDatabase.
### Using the InMemoryDatabase
To use the InMemoryDatabase class in your own code, import and initialize one instance by:
```js
const { InMemoryDB } = require("../db.js");
const db = new InMemoryDB();
```
You can then use instance methods, which work as follows:
- put(key, val) creates a new key with the provided value if a key doesn’t exist. Otherwise it will update the value of an existing key
- get(key) will return the value associated with the key or undefined if the key doesn’t exist
- begin_transaction() starts a new transaction
- commit() applies changes made within the transaction to the main state
- rollback() aborts all the changes made within the transaction
### Running Test Suite
To run the tests for InMemoryDatabase, first install the dependencies running:
```shell
npm i
```
Then, you can run the test suite with:
```shell
npm test
```
And observe that all 10 test cases should pass.

## Future Assignment Changes
To make this assignment official:
- It would probably be best to narrow it down to 1-3 different languages. That way, graders can have a set number of test suites and procedures they'd have to run to evaluate student performance.
- I also noticed a bit of ambiguity in the instructions; it notes that only one transaction can exist at a time, but does not say what to do if the programmer tries to create a new transaction when one already exists. 
- It may be more relevant to create an assignment working with a production-grade database; writing a small in-memory one like this seems trivial and non-applicable to industry.