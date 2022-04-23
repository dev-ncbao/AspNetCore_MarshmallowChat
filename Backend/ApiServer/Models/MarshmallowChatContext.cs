using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace ApiServer.Models
{
    public partial class MarshmallowChatContext : DbContext
    {
        public MarshmallowChatContext()
        {
        }

        public MarshmallowChatContext(DbContextOptions<MarshmallowChatContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Friendship> Friendships { get; set; }
        public virtual DbSet<Message> Messages { get; set; }
        public virtual DbSet<Room> Rooms { get; set; }
        public virtual DbSet<RoomInfo> RoomInfos { get; set; }
        public virtual DbSet<RoomMember> RoomMembers { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<FriendInvitation> FriendInvitations { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=127.0.0.1,1433;Database=MarshmallowChat;UID=sa;PWD=14032017");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<FriendInvitation>(entity =>
            {
                entity.ToTable("FriendInvitation");

                entity.HasOne(d => d.FromUser).WithMany(p => p.FriendInvitation1s).HasForeignKey(d => d.From).OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.ToUser).WithMany(p => p.FriendInvitation2s).HasForeignKey(d => d.To).OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasKey(e => new { e.From, e.To });

                entity.Property(e => e.DateCreated).IsRequired();
            });

            modelBuilder.Entity<Friendship>(entity =>
            {
                entity.HasKey(e => new { e.User1Id, e.User2Id });

                entity.ToTable("Friendship");

                entity.HasIndex(e => e.User2Id, "IX_Friendship_User2Id");

                entity.HasOne(d => d.User1)
                    .WithMany(p => p.FriendshipUser1s)
                    .HasForeignKey(d => d.User1Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.User2)
                    .WithMany(p => p.FriendshipUser2s)
                    .HasForeignKey(d => d.User2Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Message>(entity =>
            {
                entity.HasKey(e => new { e.RoomId, e.MessageId });

                entity.ToTable("Message");

                entity.HasIndex(e => e.UserId, "IX_Message_UserId");

                entity.Property(e => e.MessageId).ValueGeneratedOnAdd();

                entity.Property(e => e.Content)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.HasOne(d => d.Room)
                    .WithMany(p => p.Messages)
                    .HasForeignKey(d => d.RoomId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Messages)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<Room>(entity =>
            {
                entity.ToTable("Room");

                entity.Property(e => e.Type)
                    .IsRequired();
            });

            modelBuilder.Entity<RoomInfo>(entity =>
            {
                entity.HasKey(e => e.RoomId);

                entity.ToTable("RoomInfo");

                entity.Property(e => e.RoomId).ValueGeneratedNever();

                entity.Property(e => e.Avatar).HasMaxLength(100);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.HasOne(d => d.Room)
                    .WithOne(p => p.RoomInfo)
                    .HasForeignKey<RoomInfo>(d => d.RoomId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<RoomMember>(entity =>
            {
                entity.HasKey(e => new { e.RoomId, e.UserId });

                entity.ToTable("RoomMember");

                entity.HasIndex(e => e.UserId, "IX_Room_Member_UserId");

                entity.HasOne(d => d.Room)
                    .WithMany(p => p.RoomMembers)
                    .HasForeignKey(d => d.RoomId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.RoomMembers)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.HasKey(e => e.UserId);
                entity.Property(e => e.UserId).ValueGeneratedOnAdd();

                entity.Property(e => e.Avatar).HasMaxLength(100);

                entity.Property(e => e.DateCreated).HasColumnType("datetime");

                entity.Property(e => e.DayOfBirth).HasColumnType("date");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(30);

                entity.Property(e => e.Gender)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(64);

                entity.HasIndex(e => e.Username).IsUnique();

                entity.HasIndex(e => e.Email).IsUnique();

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(20);
                entity.Property(e => e.Secret).HasMaxLength(64).IsRequired();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
