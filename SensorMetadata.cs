//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace OccupOSMonitor
{
    using System;
    using System.Collections.Generic;
    
    public partial class SensorMetadata
    {
        public SensorMetadata()
        {
            this.SensorDatas = new HashSet<SensorData>();
        }
    
        public int Id { get; set; }
        public string ExtrenalId { get; set; }
        public string SensorName { get; set; }
        public string RoomId { get; set; }
        public Nullable<int> FloorNr { get; set; }
        public Nullable<decimal> GeoLongitude { get; set; }
        public Nullable<decimal> GeoLatidude { get; set; }
        public System.DateTime updatedAt { get; set; }
        public System.DateTime createdAt { get; set; }
        public int updaterId { get; set; }
        public int creatorId { get; set; }
    
        public virtual ICollection<SensorData> SensorDatas { get; set; }
    }
}
