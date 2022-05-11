using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public DateTime DayOfBirth { get; set; }
        [Required]
        [RegularExpression(@"(\d|\w|\.)+@(\d|\w|\.)+\.\w+")]
        public string Email { get; set; }
        [Required]
        [StringLength(20, MinimumLength = 8)]
        public string Username { get; set; }
        [Required]
        [StringLength(20, MinimumLength = 8)]
        public string Password { get; set; }
        [Required]
        public string Gender { get; set; }
        public string Avatar { get; set; }
        public long DateCreated { get; set; }
        [StringLength(64, MinimumLength = 64)]
        public string Secret { get; set; }

        public virtual ICollection<Friendship> FriendshipUser1s { get; set; }
        public virtual ICollection<Friendship> FriendshipUser2s { get; set; }
        public virtual ICollection<Message> Messages { get; set; }
        public virtual ICollection<RoomMember> RoomMembers { get; set; }
        public virtual ICollection<FriendInvitation> FriendInvitation1s { get; set; }
        public virtual ICollection<FriendInvitation> FriendInvitation2s { get; set; }
    }
}
