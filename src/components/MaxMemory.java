class MaxMemory{
public static void main(String a[])
{
		Runtime runtime = Runtime.getRuntime();
		System.out.println("max memory: " + runtime.maxMemory() / 1024);
}
}