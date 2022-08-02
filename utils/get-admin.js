import axios from "axios";

async function getUser(email){
    try {
        const r = await axios.post(
          'https://api.phirlo.in/graphql',
          {
            query: `query getUser($email: String!) {
                getUser( email: $email) {
                    email
                    isSuperuser
  name
  email
  avatar
    
                  }
              }
              
              `,
                variables: {
                    email: email
                }
          },
          
        )
        console.log('Potential User Response=>', r.data.data)
        const errors = r.data.errors
        if (errors) {
          return false
        } else {
          console.log(r.data.data)
          return r.data.data
        }
      } catch (e) {
        console.log(e)
        if (e.response && e.response.data) {
          console.log(e.response.data)
          return false
        }
      }
    }


export default getUser;