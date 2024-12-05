var assert = require("assert");
const { InMemoryDB } = require("../db.js");

describe("InMemoryDB", () => {
  describe("get from empty db", () => {
    it("should return undefined", () => {
      const db = new InMemoryDB();
      assert.equal(db.get("a"), undefined);
    });
  });

  describe("put without commit", () => {
    it("should not update the db", () => {
      const db = new InMemoryDB();
      db.begin_transaction();
      db.put("a", 1);
      assert.equal(db.get("a"), undefined);
      db.put("a", 2);
      assert.equal(db.get("a"), undefined);
      db.rollback();
      assert.equal(db.get("a"), undefined);
    });
  });

  describe("put with commit", () => {
    it("should update the db", () => {
      const db = new InMemoryDB();
      db.begin_transaction();
      db.put("a", 1);
      assert.equal(db.get("a"), undefined);
      db.put("a", 2);
      assert.equal(db.get("a"), undefined);
      db.commit();
      assert.equal(db.get("a"), 2);
    });
  });

  describe("put, commit, and overwrite", () => {
    it("should update the db", () => {
      const db = new InMemoryDB();
      db.begin_transaction();
      db.put("a", 1);
      db.commit();
      assert.equal(db.get("a"), 1);
      db.begin_transaction();
      db.put("a", 2);
      db.commit();
      assert.equal(db.get("a"), 2);
    });
  });

  describe("put without transaction", () => {
    it("should throw an error", () => {
      const db = new InMemoryDB();
      assert.throws(() => db.put("a", 1), Error);
    });
  });

  describe("commit without transaction", () => {
    it("should throw an error", () => {
      const db = new InMemoryDB();
      assert.throws(() => db.commit(), Error);
    });
  });

  describe("rollback without transaction", () => {
    it("should throw an error", () => {
      const db = new InMemoryDB();
      assert.throws(() => db.rollback(), Error);
    });
  });

  describe("get non-existent key", () => {
    it("should return undefined", () => {
      const db = new InMemoryDB();
      db.begin_transaction();
      db.put("a", 1);
      db.commit();
      assert.equal(db.get("b"), undefined);
    });
  });

  describe("put and rollback", () => {
    it("should not update the db", () => {
      const db = new InMemoryDB();
      db.begin_transaction();
      db.put("a", 1);
      assert.equal(db.get("a"), undefined);
      db.commit();
      assert.equal(db.get("a"), 1);
      db.begin_transaction();
      db.put("a", 2);
      assert.equal(db.get("a"), 1);
      db.rollback();
      assert.equal(db.get("a"), 1);
    });
  });

  describe("put and rollback to empty", () => {
    it("should not update the db", () => {
      const db = new InMemoryDB();
      db.begin_transaction();
      db.put("a", 1);
      assert.equal(db.get("a"), undefined);
      db.rollback();
      assert.equal(db.get("a"), undefined);
    });
  });
});
