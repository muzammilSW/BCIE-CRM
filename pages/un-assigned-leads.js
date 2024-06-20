import LeadIndex from '@/Components/Lead/Lead'
import Layout from '@/Components/Common/Layout'
import React from 'react'
import { getSession } from 'next-auth/react'
import UnAssignedLeads from '@/Components/UnAssignedLeads/UnAssignedLeads'

function Index() {
  return (
    <Layout>
      <UnAssignedLeads />
    </Layout>
  )
}

export default Index


// export async function getServerSideProps(context) {
//   const session = await getSession(context)

//   console.log('session',session);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: { session },
//   };
// }