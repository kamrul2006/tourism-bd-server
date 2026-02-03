const express = require('express');
const cors = require('cors');

const cookieParser = require('cookie-parser')
require('dotenv').config()

const port = process.env.PORT || 5000

const app = express();


// -----------middleware-----
app.use(cors(
    {
        origin: [
            'http://localhost:5173',
            'http://localhost:5173',
        ],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
))
app.use(express.json())
app.use(cookieParser());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jllddou.mongodb.net/?appName=Cluster0`

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        // ----------------collection------------------
        const BlogCollection = client.db("Tourism-BD-Server").collection('Blogs')
        const UserCollection = client.db("Tourism-BD-Server").collection('UsersList')
        const ReviewsCollection = client.db("Tourism-BD-Server").collection('ReviewsList')
        const DestinationsCollection = client.db("Tourism-BD-Server").collection('DestinationsList')


        // ----------------------------------------------------------------------------------------
        //------all Blogs ---------
        // ----------------------------------------------------------------------------------------


        // ---------------get all Blogs----------------
        app.get("/Blogs", async (req, res) => {
            const result = await BlogCollection.find().toArray();
            res.send(result)
        })


        // ----------------------get blog by id -----------------------------
        app.get("/Blogs/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }

            const result = await BlogCollection.findOne(query)
            res.send(result)
        })


        //----------add Blog--------
        app.post('/Blogs', async (req, res) => {
            const review = req.body
            const result = await BlogCollection.insertOne(review)
            res.send(result)
        })

        //---------- DELETE Blog by id----------------
        app.delete("/Blogs/:id", async (req, res) => {
            const { id } = req.params;
            try {
                const result = await BlogCollection.deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount === 1) {
                    res.status(200).json({ message: "Article deleted successfully." });
                } else {
                    res.status(404).json({ message: "Article not found." });
                }
            } catch (err) {
                console.error("Delete Error:", err);
                res.status(500).json({ message: "Server error." });
            }
        });

        // ------------- approve blog---------------
        app.patch('/Blogs/approve/:id', async (req, res) => {
            const id = req.params.id;
            try {
                const result = await BlogCollection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: { status: 'approved' } }
                );
                res.send(result);
            } catch (error) {
                res.status(500).send({ message: 'Failed to approve article' });
            }
        });


        // ----------------------------------------------------------------------------------------
        //------Users---------
        // ----------------------------------------------------------------------------------------

        // -----------get all user---------------------------------
        app.get("/users", async (req, res) => {
            const result = await UserCollection.find().toArray();
            res.send(result)
        })

        // ------------get user by id------------------------
        app.get("/users/:email", async (req, res) => {
            const email = req.params.email;
            try {
                const user = await UserCollection.findOne({ email: email });
                if (!user) {
                    return res.status(404).send({ message: "User not found" });
                }
                res.send(user);
            } catch (error) {
                console.error("Error fetching user:", error);
                res.status(500).send({ message: "Server error" });
            }
        });

        //---------------------------------add users-------------------
        app.post('/users', async (req, res) => {
            const user = req.body
            const query = { email: user.email }
            const exist = await UserCollection.findOne(query)

            console.log(user)

            if (exist) {
                return res.send({ massage: 'User Already exist', insertedId: null })
            }

            const result = await UserCollection.insertOne(user)
            res.send(result)
        })

        // ---------------------- remove admin ---------------------
        app.patch("/Users/remove-admin/:id", async (req, res) => {
            const userId = req.params.id;

            try {
                const result = await UserCollection.updateOne(
                    { _id: new ObjectId(userId) },
                    { $set: { role: "user" } }
                );

                res.json(result);
            } catch (err) {
                res.status(500).json({ message: "Failed to update user role", error: err.message });
            }
        });

        // ---------------------- make admin---------------------
        app.patch("/Users/admin/:id", async (req, res) => {
            const userId = req.params.id;

            try {
                const result = await UserCollection.updateOne(
                    { _id: new ObjectId(userId) },
                    { $set: { role: "admin" } }
                );

                res.json(result);
            } catch (err) {
                res.status(500).json({ message: "Failed to update user role", error: err.message });
            }
        });


        //----------------- DELETE a user---------------
        // app.delete("/Users/:id", async (req, res) => {
        //     const userId = req.params.id;

        //     try {
        //         const result = await UserCollection.deleteOne({ _id: new ObjectId(userId) });
        //         res.json(result);
        //     } catch (err) {
        //         res.status(500).json({ message: "Failed to delete user", error: err.message });
        //     }
        // });



        // ------------------------------------------------------------------
        // -------------Destinations---------
        // ------------------------------------------------------------------

        //----------add Destinations--------
        app.post('/destinations', async (req, res) => {
            const review = req.body
            const result = await DestinationsCollection.insertOne(review)
            res.send(result)
        })


        // -----------get all Destinations---------------------------------
        app.get("/destinations", async (req, res) => {
            const result = await DestinationsCollection.find().toArray();
            res.send(result)
        })



        //--------------------------------------------------------------------
        //-------------Reviews----------------
        //---------------------------------------------------------------------

        // ---------------get all Review----------------
        app.get("/reviews", async (req, res) => {
            const result = await ReviewsCollection.find().toArray();
            res.send(result)
        })


        //----------add review--------
        app.post('/reviews', async (req, res) => {
            const review = req.body
            const result = await ReviewsCollection.insertOne(review)
            res.send(result)
        })


        // ------------- approve review---------------
        app.patch('/reviews/approve/:id', async (req, res) => {
            const id = req.params.id;
            try {
                const result = await ReviewsCollection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: { status: 'approved' } }
                );
                res.send(result);
            } catch (error) {
                res.status(500).send({ message: 'Failed to approve article' });
            }
        });

        //---------- DELETE review by id----------------
        app.delete("/Reviews/:id", async (req, res) => {
            const { id } = req.params;
            try {
                const result = await ReviewsCollection.deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount === 1) {
                    res.status(200).json({ message: "Review deleted successfully." });
                } else {
                    res.status(404).json({ message: "Review not found." });
                }
            } catch (err) {
                console.error("Delete Error:", err);
                res.status(500).json({ message: "Server error." });
            }
        });

    }
    finally {
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('TourismBD server is running.......')
})

app.listen(port)


