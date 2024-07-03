import certificateTemplate from '@/app/models/certificateTemplate';
import { connectToDB } from '@/app/utils/database';
import { NextResponse } from 'next/server';

export const ownershipOptions = ["Every", "Shared", "Me"];
export const dateModifiedOptions = ["All Time", "Today", "Yesterday", "Last 30 Days", "Last 60 Days", "Last Year"];
export const sortByOptions = ["Newest Edited", "Oldest Edited", "Alphabetical(A-Z)", "Alphabetical(Z-A)"];

export async function GET(req, res) {
    try {
        await connectToDB();

        const { searchParams } = new URL(req.url);
        const selectOwner = searchParams.get('ownership') || "Every";
        const selectDateModified = searchParams.get('date') || "All Time";
        const selectSortOption = searchParams.get('sort') || "Newest Edited";
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;
        const id = searchParams.get('id') || "";

        let query = {};

        // Ownership filter
        if (selectOwner === "Me") {
            query['ownership.email'] = id;
        } else if (selectOwner === "Shared") {
            query['ownership.type'] = "shared";
        }

        // Date Modified filter
        const now = new Date();
        let dateFilter = {};

        if (selectDateModified === "Today") {
            dateFilter = { $gte: new Date(now.setHours(0, 0, 0, 0)) };
        } else if (selectDateModified === "Yesterday") {
            const yesterday = new Date(now.setDate(now.getDate() - 1));
            dateFilter = { $gte: new Date(yesterday.setHours(0, 0, 0, 0)), $lt: new Date(now.setHours(0, 0, 0, 0)) };
        } else if (selectDateModified === "Last 30 Days") {
            dateFilter = { $gte: new Date(now.setDate(now.getDate() - 30)) };
        } else if (selectDateModified === "Last 60 Days") {
            dateFilter = { $gte: new Date(now.setDate(now.getDate() - 60)) };
        } else if (selectDateModified === "Last Year") {
            dateFilter = { $gte: new Date(now.setFullYear(now.getFullYear() - 1)) };
        }

        if (selectDateModified !== "All Time") {
            query.updatedAt = dateFilter;
        }

        // Sorting options
        let sort = {};
        if (selectSortOption === "Newest Edited") {
            sort.updatedAt = -1;
        } else if (selectSortOption === "Oldest Edited") {
            sort.updatedAt = 1;
        } else if (selectSortOption === "Alphabetical(A-Z)") {
            sort.certificateName = 1;
        } else if (selectSortOption === "Alphabetical(Z-A)") {
            sort.certificateName = -1;
        }

        const templates = await certificateTemplate.find(query)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);

        return NextResponse.json({ status: 200, message: "Certificates fetched successfully", data: templates });
    } catch (error) {
        console.log("Error fetching certificates:", error.message);
        return NextResponse.json({ status: 500, message: "Invalid attempt: " + error.message, data: [] });
    }
}
