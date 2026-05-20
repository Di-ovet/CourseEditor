using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CourseEditor.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CascadeDeleteMigrate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LessonElements_LessonPages_LessonPageId",
                table: "LessonElements");

            migrationBuilder.DropForeignKey(
                name: "FK_Lessons_Modules_ModuleId",
                table: "Lessons");

            migrationBuilder.DropIndex(
                name: "IX_LessonElements_LessonPageId",
                table: "LessonElements");

            migrationBuilder.DropColumn(
                name: "LessonPageId",
                table: "LessonElements");

            migrationBuilder.CreateIndex(
                name: "IX_LessonElements_PageId",
                table: "LessonElements",
                column: "PageId");

            migrationBuilder.AddForeignKey(
                name: "FK_LessonElements_LessonPages_PageId",
                table: "LessonElements",
                column: "PageId",
                principalTable: "LessonPages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Lessons_Modules_ModuleId",
                table: "Lessons",
                column: "ModuleId",
                principalTable: "Modules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LessonElements_LessonPages_PageId",
                table: "LessonElements");

            migrationBuilder.DropForeignKey(
                name: "FK_Lessons_Modules_ModuleId",
                table: "Lessons");

            migrationBuilder.DropIndex(
                name: "IX_LessonElements_PageId",
                table: "LessonElements");

            migrationBuilder.AddColumn<Guid>(
                name: "LessonPageId",
                table: "LessonElements",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_LessonElements_LessonPageId",
                table: "LessonElements",
                column: "LessonPageId");

            migrationBuilder.AddForeignKey(
                name: "FK_LessonElements_LessonPages_LessonPageId",
                table: "LessonElements",
                column: "LessonPageId",
                principalTable: "LessonPages",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Lessons_Modules_ModuleId",
                table: "Lessons",
                column: "ModuleId",
                principalTable: "Modules",
                principalColumn: "Id");
        }
    }
}
