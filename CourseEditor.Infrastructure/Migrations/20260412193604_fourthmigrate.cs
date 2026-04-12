using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CourseEditor.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class fourthmigrate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LessonId",
                table: "LessonElements",
                newName: "PageId");

            migrationBuilder.AddColumn<Guid>(
                name: "LessonPageId",
                table: "LessonElements",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "LessonPages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    LessonId = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    OrderIndex = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LessonPages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LessonPages_Lessons_LessonId",
                        column: x => x.LessonId,
                        principalTable: "Lessons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LessonElements_LessonPageId",
                table: "LessonElements",
                column: "LessonPageId");

            migrationBuilder.CreateIndex(
                name: "IX_LessonPages_LessonId",
                table: "LessonPages",
                column: "LessonId");

            migrationBuilder.AddForeignKey(
                name: "FK_LessonElements_LessonPages_LessonPageId",
                table: "LessonElements",
                column: "LessonPageId",
                principalTable: "LessonPages",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LessonElements_LessonPages_LessonPageId",
                table: "LessonElements");

            migrationBuilder.DropTable(
                name: "LessonPages");

            migrationBuilder.DropIndex(
                name: "IX_LessonElements_LessonPageId",
                table: "LessonElements");

            migrationBuilder.DropColumn(
                name: "LessonPageId",
                table: "LessonElements");

            migrationBuilder.RenameColumn(
                name: "PageId",
                table: "LessonElements",
                newName: "LessonId");
        }
    }
}
