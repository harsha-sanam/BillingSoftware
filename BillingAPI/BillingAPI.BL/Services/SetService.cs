using System;
using DLI = BillingAPI.DL.Interfaces;
using BLI = BillingAPI.BL.Interfaces;
using BillingAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BillingAPI.BL.Services
{
    public class SetService : BLI.ISetService
    {
        private DLI.ISetService _setService { get; }
        public SetService(DLI.ISetService setService)
        {
            _setService = setService;
        }

        public async Task<Set> AddEditSet(Set set)
        {
            if (set.Id == 0)
            {
                int id = await _setService.AddSet(set);
                set.Id = id;
            }
            else
            {
                await _setService.EditSet(set);
            }
            return set;
        }

        public async Task DeleteSet(int id)
        {
            await _setService.DeleteSet(id);
        }

        public async Task<Set> GetSet(int id)
        {
            return await _setService.GetSet(id);
        }

        public async Task<List<Set>> GetSets()
        {
            return await _setService.GetSets();
        }
    }
}
