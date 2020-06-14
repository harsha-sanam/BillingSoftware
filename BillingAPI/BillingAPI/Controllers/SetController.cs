using System;
using Microsoft.AspNetCore.Mvc;
using BillingAPI.BL.Interfaces;
using System.Threading.Tasks;
using BillingAPI.Models;

namespace BillingAPI.Controllers
{


    [ApiController]
    public class SetController : ControllerBase
    {
        private ISetService _setService { get; }
        public SetController(ISetService setService)
        {
            _setService = setService;
        }

        [Route("api/Sets")]
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var res = await _setService.GetSets();
            return Ok(res);
        }


        [Route("api/Set")]
        [HttpPost]
        public async Task<IActionResult> Post(Set product)
        {
            await _setService.AddEditSet(product);
            return Ok();
        }

        [Route("api/Set/{id}")]
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await _setService.DeleteSet(id);
            return Ok();
        }

        [Route("api/Set/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetSet(int id)
        {
            var res = await _setService.GetSet(id);
            return Ok(res);
        }

    }
}
