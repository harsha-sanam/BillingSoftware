using System;
using System.Collections.Generic;

namespace BillingAPI.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ItemCode { get; set; }
        public string HSN { get; set; }
        public int Tax { get; set; }

        public List<ProductSet> ProductSets { get; set; }
    }
}
