using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BillingAPI.Models;

namespace BillingAPI.BL.Interfaces
{
    public interface IProductService
    {
        public Task<List<Product>> GetProductsAsync();

        public Task<Product> GetProductAsync(int id);

        public Task<Product> AddEditProduct(Product product);

        public Task DeleteProduct(int id);
    }
}
