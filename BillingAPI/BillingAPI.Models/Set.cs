using System;
using System.Collections.Generic;

namespace BillingAPI.Models
{
    public class Set
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }

        public List<ProductSet> ProductSets { get; set; }
    }
}


