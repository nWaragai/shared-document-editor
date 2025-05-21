// import { Extension, type CommandProps } from '@tiptap/core'

// declare module '@tiptap/core' {
//   interface Commands<ReturnType> {
//     fontFamily: {
//       /**
//        * Comments will be added to the autocomplete.
//        */
//       setFontFamily: (font: string) => ReturnType
//       unsetFontFamily: (font: string) => ReturnType
//     }
//   }
// }


// export const FontFamily = Extension.create({
//   name: 'fontFamily',

//   addOptions() {
//     return {
//       types: ['textStyle'], // 必ず textStyle に対して作用すること
//     }
//   },

//   addGlobalAttributes() {
//     return [
//       {
//         types: this.options.types,
//         attributes: {
//           fontFamily: {
//             default: null,
//             parseHTML: element => ({
//               fontFamily: element.style.fontFamily?.replace(/['"]/g, ''),
//             }),
//             renderHTML: attributes => {
//               if (!attributes.fontFamily) {
//                 return {}
//               }
//               return {
//                 style: `font-family: ${attributes.fontFamily}`,
//               }
//             },
//           },
//         },
//       },
//     ]
//   },

//   addCommands() {
//     return {
//       setFontFamily: (font: string) => ({ chain }: CommandProps ) =>
//         chain()
//           .setMark('textStyle', { fontFamily: font })
//           .run(),

//       unsetFontFamily: () => ({ chain }) =>
//         chain()
//           .setMark('textStyle', { fontFamily: null })
//           .run(),
//     }
//   },
// })
