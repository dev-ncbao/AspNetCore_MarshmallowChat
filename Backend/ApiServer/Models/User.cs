using System;
using System.Collections.Generic;

#nullable disable

namespace ApiServer.Models
{
    public partial class User
    {
        public User()
        {
            FriendshipUser1s = new HashSet<Friendship>();
            FriendshipUser2s = new HashSet<Friendship>();
            Messages = new HashSet<Message>();
            RoomMembers = new HashSet<RoomMember>();
        }

        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DayOfBirth { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Gender { get; set; }
        public string Avatar { get; set; }
        public DateTime DateCreated { get; set; }

        public virtual ICollection<Friendship> FriendshipUser1s { get; set; }
        public virtual ICollection<Friendship> FriendshipUser2s { get; set; }
        public virtual ICollection<Message> Messages { get; set; }
        public virtual ICollection<RoomMember> RoomMembers { get; set; }
    }
}
