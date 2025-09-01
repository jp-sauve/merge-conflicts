// import { signIn } from '@/auth';

// export function SignIn() {
//   return (
//     <form
//       action={async (formData) => {
//         'use server';
//         await signIn('credentials', formData);
//       }}
//       className="space-y-6"
//     >
//       <label htmlFor="username" className="text-sm font-medium text-gray-700">
//         Username
//         <input
//           name="username"
//           type="text"
//           className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//         />
//       </label>
//       <label htmlFor="password" className="text-sm font-medium text-gray-700">
//         Password
//         <input
//           name="password"
//           type="password"
//           className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//         />
//       </label>
//       {error && <p className="text-sm text-red-600">{error}</p>}
//       <button className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign In</button>
//     </form>
//             <p className="text-center text-sm text-gray-600">
//           Don't have an account? {' '}
//           <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
//             Register here
//           </a>
//         </p>
//   );
// }
