const bcrypt = require("bcrypt");
const connection = require("../models/db.js");

exports.signup = (req, res) => {
  console.log("Empty input value check");
  console.log(req.body);
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const errors = [];

  if (username === "") {
    errors.push("Username is empty");
  }

  if (email === "") {
    errors.push("Email is empty");
  }

  if (password === "") {
    errors.push("Password is empty");
  }

  if (errors.length > 0) {
    console.log("failed to register user");
  }
  console.log("Duplicate emails check");
  connection.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    (error, results) => {
      if (results.length > 0) {
        errors.push("Failed to register user");
      } else {
        console.log("Sign up");
        bcrypt.hash(password, 10, (error, hash) => {
          connection.query(
            "INSERT INTO user (username, name, email, password, role) VALUES (?, ?, ?, ?, 1)",
            [username, username, email, hash]
          );
        });
        // response success
        return res.status(200).json({
          message: "User successfully registered",
          data: {
            username: username,
            email: email,
          },
        });
      }
    }
  );
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  connection.query(
    "SELECT password FROM user WHERE username = ?",
    [username],
    (error, results) => {
      if (error) {
        console.error("Error executing database query: " + error.stack);
        res.status(500).json({ error: "An error occurred" });
        return;
      }

      if (results.length > 0) {
        const hashedPassword = results[0].password;

        // Compare the entered password with the stored hashed password
        bcrypt.compare(password, hashedPassword, (err, isMatch) => {
          if (err) {
            console.error("Error comparing passwords: " + err);
            res.status(500).json({ error: "An error occurred" });
            return;
          }

          if (isMatch) {
            // Login successful
            res.status(200).json({ message: "Login successful" });
          } else {
            // Login failed
            res.status(401).json({ error: "Invalid credentials" });
          }
        });
      } else {
        // Login failed (no user found)
        res.status(401).json({ error: "Invalid credentials" });
      }
    }
  );
};

exports.getStation = (req, res) => {
  const sql = "SELECT * FROM station order by id DESC";
  // Execute the query
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error retrieving feed data:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    // Return the retrieved data as a JSON response
    res.status(200).json(results);
  });
};

exports.addStation = (req, res) => {
  const { name, city, address } = req.body;

  connection.query(
    "INSERT INTO station (name,city, address) VALUES (?, ?, ?)",
    [name, city, address],
    (error, results) => {
      if (error) {
        console.error("Error executing database query: " + error.stack);
        res.status(500).json({ error: "An error occurred" });
        return;
      }

      // Return the retrieved data as a JSON response
      res.status(200).json(results);
    }
  );
};

exports.getSpesificStation = (req, res) => {
  const id = req.params.id;

  const query = `SELECT * FROM station WHERE id = ?`;

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error retrieving station data:", err);
      res.status(500).json({ error: "Failed to retrieve station data" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: "Station not found" });
      } else {
        res.json(results[0]);
      }
    }
  });
};

exports.editStation = (req, res) => {
  const id = req.params.id;
  const { name, city, address } = req.body;

  const query = `UPDATE station SET name = ?, city = ?, address = ? WHERE id = ?`;

  connection.query(query, [name, city, address, id], (err, results) => {
    if (err) {
      console.error("Error updating station data:", err);
      res.status(500).json({ error: "Failed to update station data" });
    } else {
      res.json({ message: "Station updated successfully" });
    }
  });
};

exports.deleteStation = (req, res) => {
  const id = req.params.id;

  const query = `DELETE FROM station WHERE id = ?`;

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting station data:", err);
      res.status(500).json({ error: "Failed to delete station data" });
    } else {
      res.json({ message: "Station deleted successfully" });
    }
  });
};
