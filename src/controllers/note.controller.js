import { ApiError } from "../utils/api-error.js";
import { Project } from "../models/project.models.js";
import { ProjectNote } from "../models/note.models.js";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/api-response.js";

const getNotes = async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project Not found");
  }

  const note = await ProjectNote.find({
    project: projectId,
  }).populate("createdBy", "username fullname avatar");

  return res
    .status(200)
    .json(new ApiResponse(200, note, "Notes fetched Successfully"));
};

const getNoteById = async (req, res) => {
  const { noteId } = req.params;

  const note = await ProjectNote.findById(noteId).populate(
    "createdBy",
    "username fullname avatar",
  );

  if (!note) {
    throw new ApiError(404, "Notes not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, note, "Notes fetched successfully"));
};

const createNote = async (req, res) => {
  const { projectId } = req.params;
  const { content } = req.body;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const note = ProjectNote.create({
    project: projectId,
    content,
    createdBy: req.user._id,
  });

  const populateNote = await ProjectNote.findById(note._id).populate(
    "createdBy",
    "username fullname avatar",
  );

  return res
    .status(200)
    .json(new ApiResponse(200, populateNote, "Notes created successfully"));
};

const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const { content } = req.body;

  const existingNote = ProjectNote.findById(noteId);
  if (!existingNote) {
    throw new ApiError(404, "Note not found");
  }

  const note = ProjectNote.findByIdAndUpdate(
    noteId,
    { content },
    { new: true },
  ).populate("createdBy", "username fullname avatar");

  return res
    .status(200)
    .json(new ApiResponse(200, populateNote, "Notes updated successfully"));
};

const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  const note = ProjectNote.findByIdAndDelete(noteId);

  if (!note) {
    throw new ApiError(404, "Notes not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, note, "Notes deleted successfully"));
};

export { getNotes, getNoteById, createNote, updateNote, deleteNote };
