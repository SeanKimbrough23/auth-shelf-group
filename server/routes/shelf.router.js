const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * Get all of the items on the shelf
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `select * from item`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`Server GET shelf error:`, err);
      res.sendStatus(500);
    });
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  console.log(req.body);
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user", req.user);

  const queryValues = [req.body.description, req.body.image_url, req.user.id];
  const queryText = `INSERT INTO item ("description", "image_url", "user_id")
                    VALUES ($1, $2, $3)`;
  pool
    .query(queryText, queryValues)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error completing POST shelf query", err);
      res.sendStatus(500);
    });
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete("/:id",rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  // DELETE an item from shelf ONLY when:
        // -user_id is the same as the id of the user that is logged in (passport.js - req.user.id)
        // -item.id is the parameter in the path ex. localhost:5000/api/shelf/3 <-- 3 is item.id in this case
  const itemId = req.params.id;
  const queryText = `DELETE FROM "item"
  WHERE user_id = $1 AND item.id = $2;`
  const userId = req.user.id;

  pool.query(queryText, [userId, itemId])
    .then(result => {
      console.log('deleted item from shelf where user_id =', userId)
      res.sendStatus(200);
    }).catch(err => {
      res.sendStatus(500);
    })

});

/**
 * Update an item if it's something the logged in user added
 */
router.put("/:id", (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get("/count", (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get("/:id", (req, res) => {
  // endpoint functionality
});

module.exports = router;
