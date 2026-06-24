import Student from '../../models/students/Student.js';

// @desc    Find duplicate student entries (same Name + Father Name + Mother Name + DOB)
// @route   GET /api/students/report/duplicate
export const getStudentDuplicateReport = async (req, res, next) => {
  try {
    const duplicateGroups = await Student.aggregate([
      {
        $match: {
          name: { $nin: [null, ""] },
          fatherName: { $nin: [null, ""] },
          motherName: { $nin: [null, ""] },
        }
      },
      {
        $group: {
          _id: {
            name: { $toUpper: "$name" },
            fatherName: { $toUpper: "$fatherName" },
            motherName: { $toUpper: "$motherName" },
            dateOfBirth: "$dateOfBirth"
          },
          count: { $sum: 1 },
          students: {
            $push: {
              _id: "$_id",
              studentId: "$studentId",
              name: "$name",
              roll: "$roll",
              className: "$className",
              classShiftSection: "$classShiftSection",
              year: "$year",
              guardianMobile1: "$guardianMobile1",
              createdAt: "$createdAt"
            }
          }
        }
      },
      {
        $match: { count: { $gt: 1 } }
      },
      {
        $sort: { "_id.name": 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      count: duplicateGroups.length,
      data: duplicateGroups
    });

  } catch (error) {
    next(error);
  }
};