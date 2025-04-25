import React from 'react'

function Success() {
  return (
    <div class="min-h-screen flex items-center justify-center bg-green-50 p-6">
  <div class="bg-white rounded-2xl shadow-xl p-10 max-w-md text-center">
    <div class="text-green-500 text-6xl mb-4">✔</div>
    <h1 class="text-3xl font-bold text-gray-800 mb-4">Payment Successful</h1>
    <p class="text-gray-600 mb-6">
      Thank you for your payment. Your transaction has been completed successfully.
    </p>
    <a href="/" 
      class="inline-block bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300">
      Go to Home
    </a>
  </div>
</div>


  )
}

export default Success