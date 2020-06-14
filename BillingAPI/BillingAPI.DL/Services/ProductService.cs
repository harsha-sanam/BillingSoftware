using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using BillingAPI.DL.Data;
using BillingAPI.DL.Interfaces;
using BillingAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BillingAPI.DL.Services
{
    public class ProductService : IProductService
    {
        private AppDbContext _db { get; }
        public ProductService(AppDbContext dbContext)
        {
            _db = dbContext;
        }
        public async Task<int> AddProduct(Product product)
        {
            await _db.Products.AddAsync(product);
            await _db.SaveChangesAsync();
            return product.Id;
        }

        public async Task EditProduct(Product product)
        {
            var prod = await _db.Products.FindAsync(product.Id);
            _db.Entry(prod).CurrentValues.SetValues(product);
            await _db.SaveChangesAsync();
        }

        public async Task<Product> GetProductAsync(int id)
        {
            return await _db.Products.Where(a => a.Id == id).Include(a => a.ProductSets).FirstOrDefaultAsync();
        }

        public async Task<List<Product>> GetProductsAsync()
        {
            return await _db.Products.ToListAsync();
        }

        public async Task DeleteProduct(int id)
        {
            var obj = new Product() { Id = id };
            _db.Entry(obj).State = EntityState.Deleted;
            await _db.SaveChangesAsync();
        }

        public async Task AddProductSets(List<ProductSet> productSets)
        {
            await _db.ProductSets.AddRangeAsync(productSets);
            await _db.SaveChangesAsync();
        }

        public async Task DeleteProductSets(int productId)
        {
            var objs = await _db.ProductSets.Where(a => a.ProductId == productId).ToListAsync();
            _db.ProductSets.RemoveRange(objs);
            await _db.SaveChangesAsync();
        }
    }
}
