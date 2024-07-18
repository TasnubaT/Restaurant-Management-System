import useDeliveredFoods from "../../Hooks/useDeliveredFoods";

const SaleHistory = () => {
  const [deliveredFoods, refetchFoods, isLoadingFoods] = useDeliveredFoods();
  console.log(deliveredFoods);

  // Calculate the sum of food prices, length of the array, highest price, and lowest price
  const { sumOfFoodPrices, arrayLength, highestPrice, lowestPrice } =
    deliveredFoods.reduce(
      (acc, item) => {
        // Access the foodPrice property and add it to the running total
        acc.sumOfFoodPrices += item.foodPrice;
        // Increment the array length
        acc.arrayLength += 1;
        // Find the highest price
        acc.highestPrice = Math.max(acc.highestPrice, item.foodPrice);
        // Find the lowest price
        acc.lowestPrice =
          acc.arrayLength === 1
            ? item.foodPrice
            : Math.min(acc.lowestPrice, item.foodPrice);
        return acc;
      },
      { sumOfFoodPrices: 0, arrayLength: 0, highestPrice: 0, lowestPrice: 0 } // Start with initial values
    );

  console.log("Sum of food prices:", sumOfFoodPrices);
  console.log("Length of array:", arrayLength);
  console.log("Highest price:", highestPrice);
  console.log("Lowest price:", lowestPrice);

  return (
    <div>
      <div>
        {isLoadingFoods ? (
          "Loading..."
        ) : (
          <>
            <div>
              <div>
                <div className=" mx-auto flex  m-10 stats shadow">
                  <div className="stat">
                    <div className="stat-figure text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-8 h-8 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        ></path>
                      </svg>
                    </div>
                    <div className="stat-title">Total Revenue</div>
                    <div className="stat-value text-primary">
                      BDT {sumOfFoodPrices}
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-figure text-secondary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-8 h-8 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        ></path>
                      </svg>
                    </div>
                    <div className="stat-title">Sold Food</div>
                    <div className="stat-value text-secondary">
                      {arrayLength} Items
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-figure text-secondary"></div>
                    <div className="stat-title">Highest Price</div>
                    <div className="stat-value">{highestPrice} BDT</div>
                  </div>
                  <div className="stat">
                    <div className="stat-figure text-secondary"></div>
                    <div className="stat-title">Lowest Price</div>
                    <div className="stat-value">{lowestPrice} BDT</div>
                  </div>
                </div>
                <hr className="opacity-30 m-10" />
              </div>
              <div>
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Order Info</th>
                        <th>Customer Info</th>
                        <th>Order Time & Status</th>
                        <th>Order Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      {deliveredFoods.map((deliveredFood, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle w-20 h-20">
                                  <img src={deliveredFood.foodImage} />
                                </div>
                              </div>
                              <div>
                                <div className="text-sm opacity-50">
                                  ID: {deliveredFood.foodID}
                                </div>
                                <div className="font-bold">
                                  {deliveredFood.foodTitle}
                                </div>
                                <div className="font-bold">
                                  Price: {deliveredFood.foodPrice} BDT
                                </div>
                                <div className="text-sm opacity-50 ">
                                  Category: {deliveredFood.foodCategory}
                                </div>
                                <hr className="opacity-15 my-2" />
                                <div className="text-sm opacity-50 ">
                                  Manager Name: {deliveredFood.managerName}
                                </div>
                                <div className="text-sm opacity-50 ">
                                  Manager Email: {deliveredFood.managerEmail}
                                </div>
                                <div className="text-sm opacity-50 ">
                                  Added On: {deliveredFood.foodAddedDate}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle w-20 h-20">
                                  <img src={deliveredFood.customerImage} />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">
                                  {deliveredFood.customerName}
                                </div>
                                <div className="text-sm opacity-50 ">
                                  {deliveredFood.userEmail}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-sm opacity-50">
                              {deliveredFood.requestDate}
                            </div>
                            <div className="text-sm opacity-50 ">
                              {deliveredFood.deliveryStatus}
                            </div>
                          </td>
                          <th>
                            <span className="flex flex-col">
                              {deliveredFood.deliveryStatus == "delivered" ? (
                                <a className="rounded-lg disabled text-center my-1 bg-[#00a28f] py-3 px-6 text-white">
                                  Delivered
                                </a>
                              ) : (
                                ""
                              )}
                            </span>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SaleHistory;
