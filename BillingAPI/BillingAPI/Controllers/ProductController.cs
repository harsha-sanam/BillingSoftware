using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using BillingAPI.Models;
using BillingAPI.BL.Interfaces;

namespace BillingAPI.Controllers
{
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IProductService _productService { get; }
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }
        [Route("api/Products")]
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var res = await _productService.GetProductsAsync();
            return Ok(res);
        }


        [Route("api/Product")]
        [HttpPost]
        public async Task<IActionResult> Post(Product product)
        {
            await _productService.AddEditProduct(product);
            return Ok();
        }

        [Route("api/Product/{id}")]
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await _productService.DeleteProduct(id);
            return Ok();
        }

        [Route("api/Product/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetProduct(int id)
        {
            var res = await _productService.GetProductAsync(id);
            return Ok(res);
        }

    }
}
