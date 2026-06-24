import Student from '../../models/students/Student.js';

// @desc    Get Day Wise Admission Report (filtered by entry/created date range)
// @route   GET /api/students/report/day-wise
export const getDayWiseAdmissionReport = async (req, res, next) => {
  try {
    const {
      year, fromDate, toDate, classShiftSection, reportType
    } = req.query;

    // Required field validation
    if (!year || !fromDate || !toDate) {
      return res.status(400).json({
        success: false,
        message: 'Year, From Date and To Date are required.'
      });
    }

    let query = {};

    query.year = year;

    if (classShiftSection && classShiftSection !== 'All') {
      query.classShiftSection = classShiftSection;
    }

    // ASSUMPTION: reportType maps to admissionType field.
    // Confirm with actual schema usage — adjust if your real field differs.
        if (reportType === 'Only Migration Student') {
      query.admissionType = 'Migration';
    } else if (reportType === 'Only New Admit Student') {
      query.admissionType = 'New Admission';
    }
    // 'All' or empty -> no admissionType filter

    // Date range filter on createdAt (Entry Date)
    const startDate = new Date(`${fromDate}T00:00:00.000Z`);
    const endDate = new Date(`${toDate}T23:59:59.999Z`);

    query.createdAt = { $gte: startDate, $lte: endDate };

    const reportData = await Student.find(query)
      .select('studentId name roll classShiftSection guardianMobile1 studentMobile userCreated createdAt year')
      .collation({ locale: 'en_US', numericOrdering: true })
      .sort({ classShiftSection: 1, roll: 1 });

    res.status(200).json({
      success: true,
      count: reportData.length,
      data: reportData
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get distinct Class/Shift/Section list for dropdown (filtered by year)
// @route   GET /api/students/report/day-wise/class-shift-section-list
export const getClassShiftSectionList = async (req, res, next) => {
  try {
    const { year } = req.query;

    let query = {};
    if (year) query.year = year;

    const list = await Student.distinct('classShiftSection', query);

    res.status(200).json({
      success: true,
      count: list.length,
      data: list.sort()
    });

  } catch (error) {
    next(error);
  }
};