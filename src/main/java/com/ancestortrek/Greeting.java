package com.ancestortrek;

public class Greeting {

	private final long id;
	private final String content;
    private final long extra;

	public Greeting(long id, String content) {
		this.id = id;
		this.content = content;
        this.extra = id * 25;
	}

	public long getId() {
		return id;
	}

	public String getContent() {
		return content;
	}

    public long getExtra() {
        return extra;
    }
}
