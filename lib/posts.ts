import fs from  'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * process.cwd() : 프로젝트 폴더 경로 조회
 * postsDirectory : 프로젝트 내 md 파일이 있는 폴더 경로
 */
const postsDirectory = path.join(process.cwd(), 'posts');
console.log('process.cwd()', process.cwd());
console.log('postsDirectory', postsDirectory);

export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    console.log('fileNames', fileNames);

    const allPostsData = fileNames.map(fileName => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf-8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combind the data with the id
        return {
            id,
            ...(matterResult.data as {date: string, title: string})
        }
    });

    return allPostsData.sort((a, b) => (a.date < b.date) ? 1 : -1);

}