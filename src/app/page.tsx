import { Hero } from "@/components/home/Hero";
import { ToolCategorySection } from "@/components/home/ToolCategorySection";
import { getToolsByCategory, toolCategories } from "@/lib/tools";

export default function HomePage() {
  return (
    <>
      <Hero />
      {toolCategories.map((category) => (
        <ToolCategorySection
          key={category.id}
          category={category}
          tools={getToolsByCategory(category.id)}
        />
      ))}
    </>
  );
}
