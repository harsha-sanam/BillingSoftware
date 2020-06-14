using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BillingAPI.Models;

namespace BillingAPI.DL.Interfaces
{
    public interface IProductService
    {
        public Task<List<Product>> GetProductsAsync();

        public Task<Product> GetProductAsync(int id);

        public Task<int> AddProduct(Product product);

        public Task EditProduct(Product product);

        public Task DeleteProduct(int id);

        public Task AddProductSets(List<ProductSet> productSets);

        public Task DeleteProductSets(int productId);
    }
}
