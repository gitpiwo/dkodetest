using ClassLib.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLib.DataAccess
{
    public class ItemsContext : DbContext
    {
       
        public ItemsContext(DbContextOptions options) : base(options) { }

        public DbSet<Items> Items { get; set; }


    }
}
