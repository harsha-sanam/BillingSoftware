using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BillingAPI.Models;

namespace BillingAPI.BL.Interfaces
{
    public interface ISetService
    {
        public Task<List<Set>> GetSets();

        public Task<Set> AddEditSet(Set set);

        public Task DeleteSet(int id);

        public Task<Set> GetSet(int id);
    }
}
