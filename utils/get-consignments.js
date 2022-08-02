import axios from "axios";
import Cookies from "js-cookies";

async function getConsignments(){
    try {
        const r = await axios.post(
          'https://api.phirlo.in/graphql',
          {
            query: `query allConsignments {
                allConsignments{
                    totalPending
    totalApproved
    totalListed
    totalReturned
    totalProcessing
    totalCancelled
    totalRejected
    totalSold
    totalTimesPointsCredited
    
                  }
              }
              
              `,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'JWT ' + Cookies.getItem('token'),
            },
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


export default getConsignments;