using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BillingAPI.DL.Data;
using BillingAPI.DL.Interfaces;
using BillingAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BillingAPI.DL.Services
{
    public class SetService : ISetService
    {
        private AppDbContext _db { get; }
        public SetService(AppDbContext dbContext)
        {
            _db = dbContext;
        }

        public async Task<int> AddSet(Set set)
        {
            await _db.AddAsync(set);
            await _db.SaveChangesAsync();
            return set.Id;
        }

        public async Task EditSet(Set set)
        {
            var obj = await _db.Sets.FindAsync(set.Id);
            _db.Entry(obj).CurrentValues.SetValues(set);
            await _db.SaveChangesAsync();
        }

        public async Task<Set> GetSet(int id)
        {
            return await _db.Sets.FindAsync(id);
        }

        public async Task<List<Set>> GetSets()
        {
            return await _db.Sets.ToListAsync();
        }
        public async Task DeleteSet(int id)
        {
            var obj = new Set() { Id = id };
            _db.Entry(obj).State = EntityState.Deleted;
            await _db.SaveChangesAsync();
        }
    }
}
