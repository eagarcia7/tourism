// // File to create: ./src/extensions/graphql/schema.graphql.js

// module.exports = {
//     definition: `
//       # Define custom types if needed
//     `,
//     query: `
//       # Define custom queries if needed
//     `,
//     mutation: `
//       # Define custom mutations if needed
//     `,
//     resolver: {
//       Query: {
//         // Define custom query resolvers if needed
//       },
//       Mutation: {
//         // Define custom mutation resolvers if needed
//       },
//     },
//     type: {
//       // This is the important part - we're extending the generated types
//       // You need to create this for each content type you want to use
//       Destination: {
//         data: {
//           type: 'DestinationEntity',
//           resolver: (obj) => obj,
//         },
//       },
//       DestinationEntity: {
//         id: {
//           type: 'ID',
//           resolver: (obj) => obj.id,
//         },
//         attributes: {
//           type: 'DestinationAttributes',
//           resolver: (obj) => obj,
//         },
//       },
//       DestinationAttributes: {
//         // Define all your fields here
//         name: { type: 'String' },
//         slug: { type: 'String' },
//         description: { type: 'JSON' },
//         shortDescription: { type: 'String' },
//         image: { type: 'UploadFile' },
//         weatherInfo: { type: 'JSON' },
//         travelTips: { type: 'JSON' },
//         imageUrl: { type: 'String' },
//         // Add all other fields
//       },
//       // Repeat for other content types like Event, etc.
//     },
//   };