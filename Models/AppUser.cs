// --------------------------------------------------------------------------------------------------------------------
// <copyright file="AppUser.cs" company="OccupOS">
//   This file is part of OccupOS.
//   OccupOS is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
//   OccupOS is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
//   You should have received a copy of the GNU General Public License along with OccupOS.  If not, see <http://www.gnu.org/licenses/>.
// </copyright>
// <summary>
//   Defines the AppUser type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace OccupOSMonitor.Models {

    public class AppUser : Entity {
        public virtual string Username { get; set; }
        public virtual string Email { get; set; }
        public virtual string Password { get; set; }
        public virtual System.DateTime createdAt { get; set; }
        public virtual System.DateTime updatedAt { get; set; }
        public virtual System.Nullable<int> creatorId { get; set; }
        public virtual System.Nullable<int> updaterId { get; set; }
        public virtual string FirstName { get; set; }
        public virtual string LastName { get; set; }
    }
}
