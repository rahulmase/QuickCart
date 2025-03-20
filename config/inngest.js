import { Inngest } from "inngest";
import connnectDB from "./db";
import User from "@/models/User";
import Order from "@/models/Order";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "Quickcart-next" });




// inngest  function to save user data to a database 

export const  syncUserCration = inngest.createFunction(
    {
        id:'sync-user-form-clerk'
    },

    {event: 'clerk/user.created'},

    async ({event}) =>
        {
            const { id, first_name, last_name, email_addresses, image_url }  = event.data
            const userData=
            {
                _id:id,
                email: email_addresses[0].email_address,
                name: first_name + ' ' + last_name,   
                imageUrl:image_url

            }
            await connnectDB()
            await User.create(userData)
                      
        } 

)

// inngest  function to update user data table 
export const syncUserUpdation = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
    },
    {event: 'clerk/user.updated'},
    async({event}) =>
    {
        const { id,first_name,last_name,email_addresses,image_url }  = event.data
        const userData=
        {
            _id:id,
            email : email_addresses[0].email_address,
            name : first_name + ' ' + last_name,   
            imageUrl : image_url

        }
        await connnectDB()
        await User.findByIdAndUpdate(id,userData)
    }
)

// inngest  function to deleted user data delete 
export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-with-clerk'
    },
    {event: 'clerk/user.deleted'},
    async ({event}) =>
    {
        const {id} = event.data
        await connnectDB()
        await User.findOneAndDelete(id)
    }
)

// inngest function to create user's order in database
export  const createUserOrder = inngest.createFunction(
    {
        id:'create-user-order',
        batchEvents: {
            maxSize:5,
            timeout:'5s'
        }
    },
    {event: 'order/created'},
    async ({events}) => {

        const ordrs = events.map((event) => {
            return{
                userId: event.data.userId,
                items: event.data.items,
                amount: event.data.amount,
                address: event.data.address,
                date: event.data.date
            }
        })

        await connnectDB()
        await Order.insertMany(ordrs)

        return { success: true, processed: ordrs.length};
    }
  )
