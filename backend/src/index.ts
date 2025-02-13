import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { cors } from 'hono/cors'




import { env } from 'hono/adapter'
import { sign  , verify} from 'hono/jwt'
import {
  getCookie,
  getSignedCookie,
  setCookie,
  setSignedCookie,
  deleteCookie,
} from "hono/cookie"



const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()


app.use(cors(
  {
    origin : "http://localhost:5173" , 
    credentials:true , 
  }
    


)); 


// app.use('/api/v1/blog/*' , async (c, next)=>{
//   await next(); 
// })
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.use("/api/v1/blog/*", async (c, next) => {
  try {
    // Helper function to extract the JWT token
    console.log("hello"); 
    const extractToken = () => {
      const authHeader = c.req.header("Authorization")
      console.log(authHeader); 
      if (authHeader && authHeader.startsWith("Bearer ")) {
        return authHeader.split(" ")[1] // Extract token from Authorization header
      }
     console.log("error he bhai"); 
    }
    console.log("hello 2")



    const jwt = extractToken()
    if (!jwt) {
      c.status(401)
      return c.json({ error: "Unauthorized: Missing JWT token" })
    }
    
    console.log(jwt); 
    // Verify the JWT token
     console.log("lop") 
    const payload = await verify(jwt, c.env.JWT_SECRET)
    if (!payload || !payload.id) {
      c.status(401)
      return c.json({ error: "Unauthorized: Invalid JWT token" })
    }

      console.log("lopi")
    // Set the user ID in the context for downstream handlers
    c.set("userId", payload.id)
    console.log(payload.id); 
    // Proceed to the next middleware or route handler
    await next()
  } catch (error) {
    console.log("mm")
    console.error("JWT Verification Error:", error.message)
    c.status(401)
    return c.json({ error: "Unauthorized: Invalid JWT token" })
  }
})


app.post("/api/v1/signup", async (c) => {
  const body = await c.req.json()
   const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)

  

  try {
    const prisma = new PrismaClient({
      datasourceUrl: DATABASE_URL,
    }).$extends(withAccelerate())

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name:body.name
      },
    })

    const token= await sign({id:user.id} , c.env.JWT_SECRET);
    // setCookie(c, "jwt_token", token, {
    //   httpOnly: true,
    //   secure: false , 
    //   maxAge: 30 * 24 * 60 * 60,
    //   sameSite:"none" , 
    //   path: "/",
    // })

   
  
    return c.json({
      token:token
    }); 

   
  } catch (e) {
    console.error(e)
    return c.json({ error: "Signup failed" }, 403)
  }
})



app.post('/api/v1/signin' ,  async (c)=>{

  const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL , 
  }).$extends(withAccelerate()) ; 
  const body=await c.req.json(); 
  const email=body.email ; 
  const password=body.password ; 

  const user= await prisma.user.findUnique({
    where:{
      email:body.email
    }
  })

  if(!user){
    c.status(403); 
    return c.json({
      error : "user not found "
    })
  }

  if(user.password!=password){
    c.status(401) ; 
    return c.json({
      error:"incorrect paasword "
    })
  }

 const token = await sign({ id: user.id }, c.env.JWT_SECRET)
 setCookie(c, "jwt_token", token, {
   httpOnly: true,
   secure: false,
   maxAge: 30 * 24 * 60 * 60,
   sameSite:"none",
   path: "/",
 })
 console.log(user)

 return c.json({
  token:token  , 
  name:user.name 
 }) 
 
})


app.post('/api/v1/blog/create', async (c)=>{
  console.log("hi  from inside blog create " ); 
  const userid =  await c.get("userId") ; 
  console.log("hi after usderid"); 
  console.log(userid)
  console.log("nnn")
  console.log(typeof userid) // Should be "string" for UUIDs

  const body = await c.req.json()

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const user = await prisma.user.findUnique({
      where: {
        id: userid,
      },
    })
    console.log(user)
    if (!user) {
      return c.json({
        msg: "please login ",
      })
    }
    console.log(user.name)

    const posts = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
        authorId: userid,
        authorName: user.name,
      },
    })
 
    return c.json({
      msg: "posts successfully created ",
    })
  } catch (e) {
    console.error(e)
    return c.json({ error: "Posts Failed " }, 403)
  }
} )


app.put('/api/v1/blog' , async (c)=>{


    const userid = c.get("jwtPayload").id

    const body = await c.req.json() ; 

    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      // post ki id to aayegi hi 

      const post_id=c.req.param("id"); 


      const updatedPost= await prisma.post.update({
        where:{id:post_id} , 
        data:{
          title:body.title , 
          content:body.content
        }
      })

    
      return c.json({
        msg: "posts successfully updated ",
      })
    } catch (e) {
      console.error(e)
      return c.json({ error: "Posts Failed " }, 403)
    }


})



app.get('/api/v2/blog/all', async (c)=>{

   const prisma = new PrismaClient({
     datasourceUrl: c.env.DATABASE_URL,
   }).$extends(withAccelerate())


     const userWithPosts = await prisma.post.findMany({
      
     })
     return c.json({
       data: userWithPosts,
     })




})


// is api se saare user ke blogs aa jaayenge 

app.get('/api/v1/blog/users-blog' , async(c)=>{
  // to get user's blog
  console.log("we are finally here  ")

 
  const user_id = await c.get("userId")
  console.log(user_id); 
  console.log("form users all blog ")

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const userWithPosts = await prisma.post.findMany({
    where: {
      authorId: user_id,
    },
  })
  console.log("from users all blog") ; 
  console.log(userWithPosts) ; 
  return c.json({
    data: userWithPosts,
  })
})





export default app
