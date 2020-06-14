using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BillingAPI.Models;

namespace BillingAPI.DL.Interfaces
{
    public interface ISetService
    {
        public Task<List<Set>> GetSets();

        public Task<Set> GetSet(int id);

        public Task<int> AddSet(Set set);

        public Task EditSet(Set set);

        public Task DeleteSet(int id);
    }
}
