using System;
using DLI = BillingAPI.DL.Interfaces;
using BLI = BillingAPI.BL.Interfaces;
using BillingAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace BillingAPI.BL.Services
{
    public class ProductService : BLI.IProductService
    {
        private DLI.IProductService _productService { get; }
        public ProductService(DLI.IProductService productService)
        {
            _productService = productService;
        }

        public async Task<Product> AddEditProduct(Product product)
        {
            if (product.Id == 0)
            {
                int id = await _productService.AddProduct(product);
                var productSets = product.ProductSets.Select(a => new ProductSet() { ProductId = id, SetId = a.SetId }).ToList();
                await _productService.AddProductSets(productSets);
                product.Id = id;
            }
            else
            {
                await _productService.DeleteProductSets(product.Id);
                await _productService.AddProductSets(product.ProductSets);
                await _productService.EditProduct(product);
            }
            return product;
        }

        public async Task DeleteProduct(int id)
        {
            await _productService.DeleteProduct(id);
        }

        public async Task<Product> GetProductAsync(int id)
        {
            return await _productService.GetProductAsync(id);
        }

        public async Task<List<Product>> GetProductsAsync()
        {
            return await _productService.GetProductsAsync();
        }
    }
}
